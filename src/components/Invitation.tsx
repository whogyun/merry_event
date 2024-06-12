import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Div from "./common/Div";
import Title from "./common/Title";

const Line = styled("div")`
  &::first-letter {
    font-weight: 600;
    margin-right: 4px;
  }
`;

const Info = styled("div")`
  font-weight: 600;
  line-height: 2em;
  span {
    font-size: 0.77em;
    margin: 0 23px 0 21px;
    color: #7e7979;
  }
`;

const Div1 = styled.div`
  font-weight: 600;
  font-size: 1.18em;
  line-height: 1.4em;
  margin-top: 54px;
`;

const Div2 = styled.div`
  line-height: 2em;
  margin-top: 45px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  margin-inline: auto;
`;

const Div3 = styled.div`
  margin-top: 67px;
`;

const Div4 = styled.span`
  display: inline-block;
  min-width: 42px;
  text-align: start;
`


function Invitation() {
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
      <Title>INVITATION</Title>
      <Div1>소중한 분들을 초대합니다</Div1>
      <Div2>
        {[
          "찬란하고 싱그러운 8월 여름의 끝자락",
          "용기내어 저희 두 사람이 새로운",
          "인생을 시작하는 첫날에",
          "하객분들을 초대합니다",
        ].map((v, idx) => (
          <Line key={idx}>{v}</Line>
        ))}
      </Div2>
      <Div3>
        <Info>
          조봉희·이순남<Div4>의 아들</Div4>정찬용
        </Info>
        <Info>
          최동현·강경희<Div4>의 딸</Div4>최인하
        </Info>
      </Div3>
    </Div>
  );
}

export default Invitation;
