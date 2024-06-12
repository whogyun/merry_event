import React from "react";
import styled from "styled-components";

import MainImage from "../images/main.jpg";

const Div = styled("div")`
  background-image: url(${MainImage});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  max-height: 640px;
`;

const Text = styled("div")`
  writing-mode: vertical-rl;
  margin-bottom: 20px;

  letter-spacing: 10px;
  font-size: 1.5em;
`;

const ScrollDiv = styled("div")`
  width: 100%;
  height: 82px;
  background-color: #fff;
  position: relative;
`;

const Test = styled("div")`
  position: absolute;
  top: -52px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  content: "";
  height: 133px;
  width: 179px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Bar = styled("div")`
  @keyframes scrollMot {
    0% {
      top: 0px;
    }
    50% {
      top: 45px;
    }
    100% {
      top: 0;
    }
  }

  position: relative;
  display: block;
  width: 1px;
  height: 50px;
  background-color: #707070;
  content: "";
  margin: 0 auto 3px auto;
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    background-color: #555050;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    animation: scrollMot 2s infinite ease-in-out;
  }
`;
const ScrollText = styled("div")`
  font-family: "Bodoni 72";
  font-size: 10px;
  margin-top: 13.5px;
  letter-spacing: 0.4px;
`;

const TextBox = styled.div`
  font-family: "Brand";
  padding-top: 30px;
`
const Line1 = styled.div`
  font-size: 13px;
  line-height: 17px;
`
const Line2 = styled.div`
  font-size: 32px;
  line-height: 41px;
  margin: 14px 0 25px;
`
const Line3 = styled.div`
  font-size: 15px;
  line-height: 18px;
`

function Main() {
  return (
    <div>
      <Div>
        <TextBox>
          <Line1>SAVE THE DATE</Line1>
          <Line2>WE'RE GETTING MARRIED</Line2>
          <Line3>{'CHAN YONG & IN HA'}
          <br />
          2024.08.25 AM 11:00
          </Line3>
        </TextBox>
      </Div>
      <ScrollDiv>
        <Test>
          <Bar />
          <ScrollText>SCROLL</ScrollText>
        </Test>
      </ScrollDiv>
    </div>
  );
}

export default Main;
