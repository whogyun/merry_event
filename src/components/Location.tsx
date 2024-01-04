import React, { useState, useEffect, useRef } from "react";
import Div from "./common/Div";
import Title from "./common/Title";
import { styled } from "styled-components";

import IconNaverNav from "../images/ico_nav_naver.png";
import IconKakaoNav from "../images/ico_nav_kakao.png";
import IconTNav from "../images/ico_nav_t.png";

import {CopyToClipboard} from 'react-copy-to-clipboard';

const CustomDiv = styled(Div)`
  padding-left: 0;
  padding-right: 0;
`;

const Dot = styled("span")`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
`;

const Way = styled("div")`
  padding-left: 30px;
  padding-right: 30px;
  @media (max-width: 380px) {
    padding-left: 10px;
    padding-right: 10px;
  }
  text-align: start;

  > * {
    padding-top: 38px;
  }

  > :not(:last-child) {
    border-bottom: 0.3px solid #707070;
    padding-bottom: 37px;
  }
`;

const WayTitle = styled("div")`
  line-height: 1.75em;
`;

const WayContent = styled("div")`
  font-size: 0.77em;
  line-height: 2.3em;
`;

const ButtonWrapper = styled("div")`
  background-color: #fff;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 25px;
  padding: 9px 13px;
  display: flex;
  flex-wrap: nowrap;
  margin-top: 18px;

  button {
    background-color: transparent;
    border-width: 0;
    width: 100%;
    height: 33px;
    font-size: 0.9em;
    @media (max-width: 380px) {
      font-size: 0.7em;
    }

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-family: 'Bodoni 72';
    white-space: nowrap;
  }

  button:not(:first-child) {
    &::before {
      content: "";
      width: 0.3px;
      height: 1em;
      background-color: #707070;
      position: absolute;
      left: 0;
    }
    // border-left: 0.3px solid #707070;
  }
`;

const Div1 = styled.div`
  font-size: 1.4em;
  line-height: 1.4em;
  margin: 29px 0;
`;

const Div2 = styled.div`
  line-height: 1.75;
  margin-bottom: 25px;
`;

const Button = styled.button`
  width: 154px;
  height: 30px;
  background-color: #fff;
  border-radius: 25px;
  border: 1px solid #707070;
  cursor: pointer;
  font-size: 0.82em;
  line-height: 2em;

  margin-bottom: 55px;
`;

function Location() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      
      const kakaoMap = (window as any).kakao;

      if (kakaoMap.maps) {
        const options = {
          center: new kakaoMap.maps.LatLng(
            37.48076469212664,
            126.91073016597063
          ),
          level: 3
        };

        new kakaoMap.maps.Map(mapRef.current, options);

        // const marker = new kakaoMap.maps.Marker({
        //     // 지도 중심좌표에 마커를 생성합니다
        //     position: '37.48076469212664, 126.91073016597063'
        // });
        // // // 지도에 마커를 표시합니다
        // marker.setMap(mapRef.current);
      }
    }
  }, []);

  const target = useRef<HTMLDivElement>(null)

  const [figure, setFigure] = useState(false);

  const onIntersect = ([entry] : any[], observer:any) => {
      if (entry.isIntersecting) {
        
        setFigure(true)
        // entry.style.visibility= 'visible';
        // entry.style.animation= 'smoothAppear3 2.5s ease 1s';
        observer.unobserve(entry.target);
        // await getMoreItem();
        observer.observe(entry.target);
      }
    };

    useEffect(() => {
      if (target.current && !figure) {
        
        const observer = new IntersectionObserver(onIntersect as IntersectionObserverCallback);
        observer.observe(target.current);
        return () => observer.disconnect();
      } 
    }, [figure]);

  return (
    <CustomDiv ref={target} $isvisible={figure.toString()}>
      <Title>LOCATION</Title>

      <Div1>오시는 곳</Div1>
      <Div2>
        서울특별시 관악구 남부순환로 1440
        <br />
        그레이스파티
        <br />
        02-858-1122
      </Div2>

      <CopyToClipboard text={"서울특별시 관악구 남부순환로 1440"}
        onCopy={() => alert('주소가 복사되었습니다 :)')}>
        <Button>주소 복사하기</Button>
      </CopyToClipboard>

      <div id="map" style={{ width: "100%", height: "390px" }} ref={mapRef} />

      <Way>
        <div>
          <WayTitle>네비게이션</WayTitle>
          <WayContent>원하시는 앱을 선택하시면 길안내가 시작됩니다.</WayContent>
          <ButtonWrapper>
            <button
              onClick={() => {
                const loca =
                  "https://map.naver.com/p/directions/-/14127660.6825621,4506350.1593227,%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%8A%A4%ED%8C%8C%ED%8B%B0,1957191009,PLACE_POI/-/transit?c=15.00,0,0,0,dh";
                window.location.href = loca;
              }}
            >
              <img
                alt="kakao"
                src={IconNaverNav}
                style={{ width: "1em", height: "1em", marginRight: "4px" }}
              />
              네이버지도
            </button>
            <button
              onClick={() => {
                const loca =
                  "https://map.kakao.com/link/to/그레이스파티,37.48076469212664,126.91073016597063";
                window.location.href = loca;
              }}
            >
              <img
                alt="kakao"
                src={IconKakaoNav}
                style={{ width: "1em", height: "1em", marginRight: "4px" }}
              />
              카카오내비
            </button>
            <button
              onClick={() => {
                const loca = "tmap://search?name=그레이스파티 신림";
                window.location.href = loca;
              }}
            >
              <img
                alt="kakao"
                src={IconTNav}
                style={{ width: "1em", height: "1em", marginRight: "4px" }}
              />
              티맵
            </button>
          </ButtonWrapper>
        </div>
        <div>
          <WayTitle>버스</WayTitle>
          <WayContent>
            관악구보훈회관 (신림푸르지오) 하차
            <br />
            <Dot style={{ backgroundColor: "#0C00FF" }} />
            간선 : 500, 504, 643, 651
            <br />
            <Dot style={{ backgroundColor: "#00AC35" }} />
            지선 : 5413, 5528, 5530, 5535, 5615, 6512, 9, 9-3
          </WayContent>
        </div>
        <div>
          <WayTitle>지하철</WayTitle>
          <WayContent>
            <Dot style={{ backgroundColor: "#00AC35" }} />
            2호선 신림역 5번 출구 셔틀버스 운행
            <br />
            (신림역 5번출구 공사로 인하여 6번 출구 이용)
            <br />
            신대방역 2번 출구에서 도보 15분 소요
          </WayContent>
        </div>
        <div>
          <WayTitle>주차</WayTitle>
          <WayContent>
            그레이스파티 관악 웨딩홀 옆 주차타워 이용 가능
            <br />
            2시간 무료 주차
          </WayContent>
        </div>
      </Way>
    </CustomDiv>
  );
}

export default Location;
