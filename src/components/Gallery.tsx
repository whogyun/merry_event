import React, { useRef, useCallback, useState, lazy, useEffect} from "react";
import Div from "./common/Div";
import Title from "./common/Title";

import LazyLoad from "react-lazyload";

import styled from "styled-components";

import image1 from "../images/gallery/1.jpg";
import image2 from "../images/gallery/2.jpg";
import image3 from "../images/gallery/3.jpg";
import image4 from "../images/gallery/4.jpg";
import image5 from "../images/gallery/5.jpg";
import image6 from "../images/gallery/6.jpg";
import image7 from "../images/gallery/7.jpg";
import image8 from "../images/gallery/8.jpg";
import image9 from "../images/gallery/9.jpg";
import image10 from "../images/gallery/10.jpg";
import image11 from "../images/gallery/11.jpg";
import image12 from "../images/gallery/12.jpg";
import image13 from "../images/gallery/13.jpg";
import image14 from "../images/gallery/14.jpg";
import image15 from "../images/gallery/15.jpg";
import image16 from "../images/gallery/16.jpg";
import image17 from "../images/gallery/17.jpg";
import image18 from "../images/gallery/18.jpg";
import image19 from "../images/gallery/19.jpg";
import image20_1 from "../images/gallery/20-1.jpg";
import image20_2 from "../images/gallery/20-2.jpg";
import image21 from "../images/gallery/21.jpg";
import image22 from "../images/gallery/22.jpg";
import image23 from "../images/gallery/23.jpg";
import image24 from "../images/gallery/24.jpg";
import image25 from "../images/gallery/25.jpg";
import image26 from "../images/gallery/26.jpg";
import image27 from "../images/gallery/27.jpg";
import image28 from "../images/gallery/28.jpg";
import image29 from "../images/gallery/29.jpg";
import image30_1 from "../images/gallery/30-1.jpg";
import image30_2 from "../images/gallery/30-2.jpg";

import iconArrowLeft from "../images/arrowLeft.svg";
import iconArrowRight from "../images/arrowRight.svg";

import {CloseRounded } from "@material-ui/icons";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import Modal from "./common/Modal";

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
// import 'swiper/components/navigation/navigation.min.css'
// import 'swiper/components/pagination/pagination.min.css'


const imgs = [
  image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,
  image11, image12, image13, image14, image15, image16, image17, image18, image19, image20_1, image20_2,
  image21, image22, image23, image24, image25, image26, image27, image28, image29, image30_1, image30_2
] as string[]


const CustomSwiper = styled(Swiper)`
.swiper-wrapper {
  left: 24%;
}
height: 100%;

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  // font-size: 18px;
  // background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;

  transform: scale(0.9);
  transform-origin: 50% 100%;
  transition: transform 500ms ease;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.swiper {
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide-active {
  transform: scale(1);
}

`

const PopupSwiper = styled(Swiper)`

height: 100%;

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  // font-size: 18px;
  // background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;

}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.swiper {
  margin-left: auto;
  margin-right: auto;
}

`

const Album = styled.div`
  height: 400px;
  width: 100%;
  box-sizing: border-box;
`;

const Div1 = styled.div`
  margin: 15px 0;
  color: #868383;
  font-size: 0.88em;
  line-height: 1.2em;
  letter-spacing: 0.5em;
`;
const Div2 = styled.div`
  font-size: 0.7em;
  line-height: 2.45em;
`;

const ModalContainer = styled.div`
  width: 90vw;
  height: 80vh;
  // background-color: #FFF;
  padding: 10px;
  border-radius: 25px;
  position: relative;
`

const Close = styled.div`
      position: absolute;
    z-index: 2;
    right: 10px;
    top: 4px;
    
`


function Gallery() {

  
  
    const [popupSwiper, setPopupSwiper] = useState<any>(undefined);
    const [mainSwiper, setMainSwiper] = useState<any>(undefined);

    const [modalOpen, setModalOpen] = useState(false)


    const handleModalClose = useCallback(() => {
    setModalOpen(false);
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

    useEffect(() => {
    let timerId : any = null;
    
    if (figure && mainSwiper) {

      timerId = setInterval(() => {
        if (!modalOpen) {

          mainSwiper.slideNext();
        }
      }, 5000);
      
    }
    
      return () => {
      if (timerId) {

      clearInterval(timerId);
      }
    }
  }, [figure, mainSwiper, modalOpen])

  return (
    <>
    
    <Div ref={target} $isvisible={figure.toString()} style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Title>GALLERY</Title>


      <Album id='test'>
        <CustomSwiper
          slidesPerView={1.8}
          spaceBetween={10}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          onSwiper={(v) => setMainSwiper(v)}
          onActiveIndexChange ={(v) => {
            if (v.activeIndex !== undefined) {
              if (!modalOpen) {
                popupSwiper?.slideTo(v.activeIndex-1)
              }
            }
          }}
        >
        {imgs.map((v, idx) => <SwiperSlide key={idx} onClick={() => setModalOpen(true)}>
        
        <img src={v} alt='' />
        
        </SwiperSlide>)}
          
      </CustomSwiper>

      
      </Album>
      
      

      <Div1>
        <img src={iconArrowLeft} alt="" style={{ marginRight: "14px" }} />
        SWIPE
        <img src={iconArrowRight} alt="" style={{marginLeft : "8px" }} />
      </Div1>
      <Div2>좌우로 넘기시면 더 많은 사진을 보실 수 있습니다</Div2>
    </Div>

    <Modal open={modalOpen} onClose={handleModalClose} disableBackClick>
    <ModalContainer>
    <Close onClick={handleModalClose}>
    <CloseRounded />
    </Close>
      <PopupSwiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          onSwiper={(v) => setPopupSwiper(v)}
          onActiveIndexChange ={(v) => {
            if (modalOpen && v.activeIndex !== undefined) {
              mainSwiper?.slideTo(v.activeIndex+1)
            }
          }}
        >
          {imgs.map((v, idx) => 
          <SwiperSlide key={idx}>
          <LazyLoad  once style={{width:'100%', height:'100%'}}>
        
          <img src={v} alt='' />
</LazyLoad>
          </SwiperSlide>
          )}
      </PopupSwiper>
      
      </ModalContainer>
    </Modal>
    </>
  );
}

export default Gallery;
