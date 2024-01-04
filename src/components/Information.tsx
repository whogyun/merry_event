import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import Div from "./common/Div";
import Title from "./common/Title";

import { Swiper, SwiperSlide } from 'swiper/react';

import imgDining from "../images/dining.png";
import imgVenue from "../images/venue.png";
import imgPhotoBooth from "../images/photo-booth.png";
import imgParking from "../images/parking.png";
import imgSuttleBus from "../images/suttle-bus.png";

const CustomSwiper = styled(Swiper)`

height: 400px;

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  // text-align: center;
  // font-size: 18px;
  // background: #fff;

  /* Center slide text vertically */
  // display: flex;
  // justify-content: center;
  // align-items: center;

  // transform: scale(0.9);
  // transform-origin: 50% 100%;
  // transition: transform 500ms ease;
}

// .swiper-slide img {
//   display: block;
//   width: 100%;
//   height: 100%;
//   object-fit: contain;
// }

.swiper {
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide-active {
  // background-color:red;
  // transform: scale(0.8);
  // transition: transform 500ms ease;
  // transform: scale(1);
}

// .swiper-slide-prev, swiper-slide-next {

// }
`

const Item = styled("div")`
  display: inline-block;
  min-width: 80%;
  // margin-top: 45px;
`;

const Content = styled("div")`
  white-space: break-spaces;
  text-align: center;

  line-height: 1.8em;
  font-size: 1em;

  margin-top: 40px;
`;

const ContentTitle = styled("div")<{ $back: string }>`
  width: 100%;
  height: 184px;
  background-color: rgb(0,0,0);
  position: relative;
  overflow: hidden;
  border-radius: 64px;

  display: flex;
  justify-content: center;
  align-items: center;
  // &:hover {
  //   background-color: #000;
  // }
  span {
    color: #fff;
    position: relative;
    font-size: 1.5em;
    letter-spacing: 0.4em;
  }

  &::before {
    content: "";
    background: ${({ $back }) => `url(${$back})`};
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.8;
  }
`;



function Information() {
  

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

    const [mainSwiper, setMainSwiper] = useState<any>(undefined);

    useEffect(() => {
      let timerId : any = null;
      
      if (figure && mainSwiper) {
  
        timerId = setInterval(() => {
         
            mainSwiper.slideNext();
          
        }, 5000);
        
      }
      
        return () => {
        if (timerId) {
  
        clearInterval(timerId);
        }
      }
    }, [figure, mainSwiper])

  return (
    <Div ref={target} $isvisible={figure.toString()} style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Title>INFORMATION</Title>
      <div style={{ margin: "16px 0 40px" }}>저희의 결혼식을 소개합니다</div>

      <CustomSwiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          pagination={{
            clickable: true,
          }}
          onSwiper={(v) => setMainSwiper(v)}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {[
          {
            title: "DINING",
            back: imgDining,
            content:
              "식사는 결혼식 및 사진 촬영이 끝난 후\r\n웨딩홀 5층에서 뷔페식으로 진행됩니다.\r\n부족함 없이 즐기실 수 있도록\r\n다양한 메뉴가 준비되어 있습니다."
          },
          {
            title: "VENUE",
            back: imgVenue,
            content:
              "단독홀로 진행되는 그레이스파티홀에서\r\n저희 두 사람의 웨딩이 진행됩니다."
          },
          {
            title: "PHOTO BOOTH",
            back: imgPhotoBooth,
            content:
              "참석 해주신 분들을 기억하고자\r\n포토 부스를 준비 했습니다.\r\n귀한 발걸음 해주신 여러분의\r\n환한 미소와 따뜻한 말씀 남겨주시면\r\n소중히 간직하도록 하겠습니다."
          },
          {
            title: "PARKING",
            back: imgParking,
            content:
              "웨딩홀 바로 옆 주차건물에 주차 시\r\n2시간 무료주차가 가능하며,\r\n따로 주차권없이 출차 가능합니다."
          },
          {
            title: "SUTTLE BUS",
            back: imgSuttleBus,
            content:
              "신림역 5번출구 앞 셔틀버스가 운행됩니다.\r\n셔틀버스는 15분 간격으로 운행되니,\r\n참고 부탁드립니다.\r\n(공사 시 6번출구 이용)"
          }
        ].map(({ title, content, back }, idx) => (
          <SwiperSlide key={idx}>
          <Item >
            <ContentTitle $back={back}>
              <span>{title}</span>
            </ContentTitle>
            <Content>
              {content}
            </Content>
          </Item>
          </SwiperSlide>
        ))}
      </CustomSwiper>

    </Div>
  );
}

export default Information;
