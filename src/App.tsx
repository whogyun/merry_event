import React, {useCallback, lazy, useState, useEffect, useRef} from "react";
import logo from "./logo.svg";
import "./App.css";

import styled from "styled-components";

import MainImage from "./images/main.jpg";
import IconLink from "./images/link.png";
import IconKakao from "./images/ico_kakao.png";

import KakaoBackground from "./images/kakao_background.jpg";



import {CopyToClipboard} from 'react-copy-to-clipboard';

import axios from 'axios'

const Main = lazy(() => import("./components/Main"));
const Invitation = lazy(() => import("./components/Invitation"));
const Calender = lazy(() => import("./components/Calender"));
const Gallery = lazy(() => import("./components/Gallery"));
const Information = lazy(() => import("./components/Information"));
const Contact = lazy(() => import("./components/Contact"));
const Account = lazy(() => import("./components/Account"));
const Location = lazy(() => import("./components/Location"));
const GuestBook = lazy(() => import("./components/GuestBook"));

const Div = styled("div")`
  width: 100vw;
  height: 100vh;
  background-color: #333;
  overflow: auto;
`;

const Container = styled("div")`
  background-color: #fff;
  width: 500px;
  margin: 0 auto;
  // padding-bottom: 50px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Section = styled("div")`
  padding: 20px;
  border: 1px solid black;
`;

const BottomDiv = styled.div`
background-color: #F5F5F5;
display: flex;
flex-wrap: nowrap;
height: 100px;

button {
      width: 100%;
    border-width: 0;
    background-color: transparent;
    padding: 0;
}
`

const DivContainer = styled.div`
  @keyframes smoothAppear3 {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  animation: smoothAppear3 2.5s ease 1s;
`;

const DivContainer2 = styled.div`
  @keyframes smoothAppear4 {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  animation: smoothAppear4 2.5s ease 1s;
`;

function App() {

  const handleClickKakao = useCallback(() => {
    const kakao = (window as any).Kakao;
    
    if (kakao) {
      
      kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '정찬용 ♥ 최인하 결혼식에 초대합니다.',
        description: '2024.08.25 AM 11:00 W스퀘어컨벤션',
        imageUrl: 'http://localhost:3000/static/media/main.40a62f79f1da50fa390a.jpg',
        link: {
          mobileWebUrl: 'http://married-beans.com',
          webUrl: 'http://married-beans.com',
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'http://married-beans.com',
            webUrl: 'http://married-beans.com',
          },
        },
      ],
      // 카카오톡 미설치 시 카카오톡 설치 경로이동
      installTalk: true,
    })
    }

  }, [])

  const [name, setName] = useState("");
    const [result, setResult] = useState("");
 
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
 

  return (
    <Div className="App">
      <Container>
      
        <Main />

        {/* <DivContainer ref={target} id='content1' style={{opacity: figure ? '0': '1'}}> */}
        <Invitation />
        {/* </DivContainer> */}


      {/* <DivContainer2 ref={target2} id='content2'  style={{opacity: figure2 ? '0': '1'}}> */}
        <Calender />
      {/* </DivContainer2> */}

        <Gallery />
      {/* <DivContainer ref={setTarget} id='content3'>
        </DivContainer> */}

<Information />
<Location />
<Contact />
<Account />
<GuestBook />
      {/* 
        <DivContainer ref={setTarget} id='content4' style={{visibility: figure['content4'] ? 'hidden': 'visible'}}>
        </DivContainer>

        <DivContainer ref={setTarget} id='content5' style={{visibility: figure['content5'] ? 'hidden': 'visible'}}>
        </DivContainer>

        <DivContainer ref={setTarget} id='content6' style={{visibility: figure['content6'] ? 'hidden': 'visible'}}>
        </DivContainer>

        <DivContainer ref={setTarget} id='content7' style={{visibility: figure['content7'] ? 'hidden': 'visible'}}>
        </DivContainer>
        
        <DivContainer ref={setTarget} id='content8' style={{visibility: figure['content8'] ? 'hidden': 'visible'}}>
        </DivContainer> */}
        

        <BottomDiv>
        <button onClick={handleClickKakao}>
        <img src={IconKakao} alt='' style={{ marginRight: "4px", width: '16px', height: '16px' }}/>
        <img src={KakaoBackground} alt='' style={{ marginRight: "4px", width: '16px', height: '16px', display: 'none' }}/>
        카카오로 공유하기
        </button>
        
        <CopyToClipboard text={'http://married-beans.com'}
          onCopy={() => alert('청첩장 링크가 복사되었습니다 :)')}>
          <button>
          <img src={IconLink} alt='' style={{ marginRight: "4px", width: '16px', height: '16px' }}/>
          청첩장 링크 복사</button>
        </CopyToClipboard>

        </BottomDiv>
      </Container>
    </Div>
  );
}

export default App;
