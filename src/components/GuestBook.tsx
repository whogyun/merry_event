import React, { useCallback, useState, useEffect, useRef, ChangeEventHandler } from "react";
import styled from "styled-components";
import Div from "./common/Div";
import Title from "./common/Title";
import { PrismaClient } from "@prisma/client";
import Modal from "./common/Modal";
import { Swiper, SwiperSlide } from 'swiper/react';

import IconWrite from "../images/write.png";

import axios from 'axios'

const ItemGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: start;
  height: 340px;
  overflow: auto;
`;

const ItemWrapper = styled.div`
  border-radius: 22px;
  box-shadow: 0 0 6px 0 rgb(0, 0, 0, 0.16);
  height: 90px;
  padding: 20px;
  box-sizing: border-box;
  width: calc(100% - 6px);
  margin: 3px auto;
`;

const WriteContainer = styled.div`
background-color: #F4F4F4;
    border-radius: 54px;
    padding: 70px 40px 50px;
    position: relative;
    max-width: 400px;
    max-height: 517px;
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto;
`;

const Button = styled("button")`
height: 33px;
min-width: 112px;
border-radius: 25px;
background-color: transparent;
    border-width: 0;
    
    font-size: 1em;
    border: 0.2px solid #707070;
    cursor: pointer;
    margin-top: 15px;

    img {
      margin-right: 2px;
    }
    `

    

const Input = styled.input`
  border-width: 0;
  border-radius: 14.5px;
  font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    padding: 8px;
    &:focus-visible {
      outline-color: #707070;
    }
`

const Textarea = styled.textarea`
  border-width: 0;
  border-radius: 14.5px;
  font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    resize: none;
    padding: 8px;
    height: 220px;
    &:focus-visible {
      outline-color: #707070;
    }
`
const Div1 = styled.div`
  font-size: 1.53em;
  line-height: 1.35em;
  margin: 31px 0 56px;
`

const FromDiv = styled.div`
  font-size: 0.8em;
  margin-bottom: 10px;
`

const ContentDiv = styled.div`
`



const Item = ({ item }: { item: { from: string; content: string } }) => {
  return (
    <ItemWrapper>
      <FromDiv>{`From. ${item.from}`}</FromDiv>
      <ContentDiv>{item.content}</ContentDiv>
    </ItemWrapper>
  );
};

function GuestBook() {
  const client = new PrismaClient();
  const divRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false);
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');

  const handleModalClose = useCallback(() => {
    setOpen(false);
  }, []);

  // useEffect(() => {
  //   let timerId : any = null;
  //   const divItem = divRef.current
  //   if (divItem) {

  //     timerId = setInterval(() => {

  //       divItem.scrollTo(0, divItem.scrollTop+1);
        
  //       if (divItem.offsetHeight - divItem.scrollTop < 1) {
  //         divItem.scrollTo(0, 0);
  //       }
  //     }, 80);
      
  //   }

  //   return () => {
  //     if (timerId) {

  //     clearInterval(timerId);
  //     }
  //   }
  // }, [])
 useEffect(() => {
    console.log('aaaa')

            axios.post('http://localhost:9292/guestBook/list.json')
            .then((response)=>
            {
                console.log('response', response)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

  }, [])
  const onSubmit = useCallback(() => {
    console.log('writer  ', writer);
    console.log('content  ', content);

            const formData = new FormData();
            formData.append('writer',writer);
            formData.append('content', content);

            axios.post('http://localhost:9292/guestBook/insertInfo.json',formData)
            .then((response)=>
            {
                console.log('response', response)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

  }, [writer, content])

  // const handleWriterChange = ((v:ChangeEventHandler<HTMLInputElement>) => {
  //   console.log(v);
  //   // setWriter(v.target.value)
  // }, [])

// useEffect(() => {
//   
// let reqOption = {
//       method : "get",
//       headers : {
//         "content-type" : "application/json"
//       }
//     }

//   fetch("/api/product", reqOption).then((res) => console.log(res))
// .then(data => console.log(data))

// }, [])

// useEffect(() => {
//   fetch("/selectData.php", {
//       method: "GET"
//     })
//       .then((res) => {
//         console.log(res);
//         if (res.ok === false) {
//           alert("연결이 원활하지 않습니다.");
//           // navigate("/");
//         } else if (res.ok) {
//           alert("저장되었습니다.");
//           // navigate("/");
//         }
//       })
//       .catch(() => {
//         console.log("초기 화면 돌아가기");
//       });

// }, [])

  // const handleTest = useCallback(() => {
  //   const input = {a: 'aa', b: 'bb'}
  //   axios.post('http://localhost:3306/api/user/save', input)

  // }, [])
  
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
    <Div ref={target} $isvisible={figure.toString()}>
      <Title>GUEST BOOK</Title>
      <Div1>신랑, 신부에게 전하는 말씀</Div1>

      <ItemGroup ref={divRef}>
        {[
          { from: "맹골", content: "잘살아라" },
          { from: "맹골2", content: "잘살아라" },
          { from: "맹골3", content: "잘살아라" },
          { from: "맹골4", content: "잘살아라" },
          { from: "맹골5", content: "잘살아라" },
          { from: "맹골6", content: "잘살아라" }
        ].map((v, idx) => (
          <Item item={v} key={idx}/>
        ))}
      </ItemGroup>

      <div>
        <Button onClick={() => setOpen(true)}>
        <img src={IconWrite} alt='' style={{ marginRight: "4px", width: '10px', height: '10px' }}/>
        작성하기</Button>
        
        {/* <button onClick={handleTest}>테스트</button> */}
      </div>

      <Modal open={!!open} onClose={handleModalClose}>
        <WriteContainer>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', justifyItems: 'start',     fontWeight: 700}}>
          <div style={{lineHeight: '34px'}}>작성자</div>
          <Input value={writer} onChange={(v) => setWriter(v.target.value)}/>
          <div style={{lineHeight: '34px'}}>내용</div>
          <Textarea value={content} onChange={(v) => setContent(v.target.value)}/>
          </div>
          <Button onClick={onSubmit}>
          <img src={IconWrite} alt='' style={{ marginRight: "4px", width: '10px', height: '10px' }}/>
          작성하기</Button>
        </WriteContainer>
      </Modal>
    </Div>
  );
}

export default GuestBook;
