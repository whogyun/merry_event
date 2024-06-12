import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Div from "./common/Div";
import Title from "./common/Title";

const Grid = styled("div")`
  font-style: italic;
  color: #bdbdbd;
  display: grid;
  grid-template-columns: repeat(7, auto);
  justify-content: center;
  gap: 0.6em 1.5em;
  line-height: 2em;

  :nth-child(1),
  :nth-child(36) {
    color: #bdbdbd;
    position: relative;
  }


  :nth-child(36)::before {
    content: "";
    font-size: 0.6em;
    line-height: 1em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(Calc(-50% + 2px), -50%);
    /* border: 1px solid black; */
    border-radius: 8px;
    width: Calc(1rem + 8px);
    height: Calc(1rem + 8px);
    background-color: #002266;
    z-index: -1;
  }

  :nth-child(1),
  :nth-child(22),
  :nth-child(15),
  :nth-child(29) {
    color: red;
  }

  :nth-child(36) {
    color: #FFF;
  }

  

  // :nth-child(1),
  // :nth-child(36) {
  //   color: red;
  // }

  
  :nth-child(22),
  :nth-child(15),
  :nth-child(29) {
    
    opacity: 0.6;
  }

  // :nth-child(1) {
  //   color: red;
  // }
`;

const Blur = styled("div")`
  color: transparent;
  line-height: 2.35em;
`;

const NoBlur = styled("div")`
  color: #bdbdbd;
  line-height: 2.35em;
`;

const Div1 = styled.div`
  margin: 42px 0;
  line-height: 1.7em;
`;

const Div2 = styled.div`
font-style: italic;
    font-size: 2em;
    color: #8C8C8C;
    line-height: 1.7em;
    margin-bottom: 24px;
`;




function Calender() {
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
    <Div ref={target} $isvisible={figure.toString()}>
      <Title>WEDDING DAY</Title>
      <Div1>
        2024년 08월 25일 오전 11시
        <br />
        더블유스퀘어 8층 채플홀
      </Div1>
      <Div2>
        08
        <br />
        /
      </Div2>
      <Grid>
        {["S", "M", "T", "W", "T", "F", "S"].map((v, idx) => (
          <div key={idx}>{v}</div>
        ))}
        {Array(4)
          .fill(26)
          .map((n, idx) => n + idx)
          .map((n, idx) => (
            <Blur key={idx}>{n}</Blur>
          ))}
        {Array(31)
          .fill(1)
          .map((n, idx) => n + idx)
          .map((n, idx) => (
            <NoBlur key={idx}>{n}</NoBlur>
          ))}
        {/* {Array(6)
          .fill(1)
          .map((n, idx) => n + idx)
          .map((n, idx) => (
            <Blur key={idx}>{n}</Blur>
          ))} */}
      </Grid>
    </Div>
  );
}

export default Calender;
