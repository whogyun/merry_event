import React, { useState, useEffect, useRef } from "react";
import Div from "./common/Div";
import Title from "./common/Title";
import { styled } from "styled-components";

import IconNaverNav from "../images/ico_nav_naver.png";
import IconKakaoNav from "../images/ico_nav_kakao.png";
import IconTNav from "../images/ico_nav_t.png";

import { CopyToClipboard } from "react-copy-to-clipboard";

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
    font-family: "Bodoni 72";
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
            37.400623052972804,
            127.1115170513737
          ),
          level: 3,
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

  const target = useRef<HTMLDivElement>(null);

  const [figure, setFigure] = useState(false);

  const onIntersect = ([entry]: any[], observer: any) => {
    if (entry.isIntersecting) {
      setFigure(true);
      // entry.style.visibility= 'visible';
      // entry.style.animation= 'smoothAppear3 2.5s ease 1s';
      observer.unobserve(entry.target);
      // await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    if (target.current && !figure) {
      const observer = new IntersectionObserver(
        onIntersect as IntersectionObserverCallback
      );
      observer.observe(target.current);
      return () => observer.disconnect();
    }
  }, [figure]);

  return (
    <CustomDiv ref={target} $isvisible={figure.toString()}>
      <Title>LOCATION</Title>

      <Div1>오시는 곳</Div1>
      <Div2>
        경기도 성남시 판교역로 226번길 16
        <br />
        더블유스퀘어
        <br />
        031-703-0116
      </Div2>

      <CopyToClipboard
        text={"경기도 성남시 판교역로 226번길 16"}
        onCopy={() => alert("주소가 복사되었습니다 :)")}
      >
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
                  "https://map.naver.com/p/directions/-/14149984.8268292,4495077.7812934,W%EC%8A%A4%ED%80%98%EC%96%B4%EC%BB%A8%EB%B2%A4%EC%85%98,36301790,PLACE_POI/-/transit?c=12.67,0,0,0,dh";
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
                  "https://map.kakao.com/link/to/W스퀘어컨벤션,37.400623052972804,127.1115170513737";
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
                const loca = "tmap://search?name=w스퀘어컨벤션 판교";
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
          <WayTitle>주차</WayTitle>
          <WayContent>
            더블유스퀘어 주차타워 이용 가능 (200대)
            <br />
            삼환하이펙스 주차타워 이용 가능 (300대)
            <br />
            2시간 무료 주차
          </WayContent>
        </div>
        <div>
          <WayTitle>근처 카페</WayTitle>
          <WayContent>
            - 스타벅스 판교 HIPEX점 (도보 2분)
            <br />
            - 알레그리아 판교테크노밸리점 (도보 2분)
            <br />
            - 칼디커피더팜 (도보 2분)
          </WayContent>
        </div>
        <div>
          <WayTitle>근처 걷기 좋은 길</WayTitle>
          <WayContent>
            - 봇들저류지 공원 (도보 3분)
            <br />
            - 판교테크노파크공원 (도보 7분)
          </WayContent>
        </div>
      </Way>
    </CustomDiv>
  );
}

export default Location;
