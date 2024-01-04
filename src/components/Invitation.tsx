import React, {useState, useEffect, useRef} from "react";
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
    color: #7E7979;
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
`;

const Div3 = styled.div`
  margin-top: 67px;
`;

function Invitation() {

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
      <Title>INVITATION</Title>
      <Div1>소중한 분들을 초대합니다</Div1>
      <Div2>
        {[
          "명랑하고 쾌활한 저희 두사람 결혼합니다",
          "균형을 맞춰가며 서로 이해하는 마음으로",
          "태양처럼 따스히 때로는 바다처럼 포근히",
          "양보하고 아끼며 행복하게 잘 살겠습니다"
        ].map((v, idx) => (
          <Line key={idx}>{v}</Line>
        ))}
      </Div2>
      <Div3>
        <Info>
          김정국·우춘화<span>의 장남</span>김태양
        </Info>
        <Info>
          우상헌·김정희<span>의 장녀</span>우명균
        </Info>
      </Div3>
    </Div>
  );
}

export default Invitation;
