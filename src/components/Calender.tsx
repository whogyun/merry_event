import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";

import Div from "./common/Div";
import Title from "./common/Title";

const Grid = styled("div")`
  display: grid;
  grid-template-columns: repeat(7, auto);
  justify-content: center;
  gap: 0.6em 1.5em;
  line-height: 2em;

  :nth-child(1),
  :nth-child(22) {
    color: #ff0000;
    position: relative;
  }

  :nth-child(22)::before {
    content: "♥";
    font-size: 0.6em;
    line-height: 1em;
    position: absolute;
    top: 1em;
    left: 50%;
    transform: translate(-50%, -100%);
  }

  :nth-child(15),
  :nth-child(29),
  :nth-child(36),
  :nth-child(43) {
    color: #ffa7a7;
  }
`;

const Blur = styled("div")`
  color: #eaeaea;
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

function Calender() {

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
      <Title>WEDDING DAY</Title>
      <Div1>
        2024년 3월 10일 오후 2시 50분
        <br />
        그레이스파티 그레이스파티홀
      </Div1>
      <Grid>
        {["S", "M", "T", "W", "T", "F", "S"].map((v, idx) => (
          <div key={idx} >{v}</div>
        ))}
        {Array(5)
          .fill(25)
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
        {Array(6)
          .fill(1)
          .map((n, idx) => n + idx)
          .map((n, idx) => (
            <Blur key={idx}>{n}</Blur>
          ))}
      </Grid>
    </Div>
  );
}

export default Calender;
