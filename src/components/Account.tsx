import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import Div from "./common/Div";
import Title from "./common/Title";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { DescriptionOutlined } from "@material-ui/icons";

import Accordion from "./common/Accordion";

import kakaoImage from "../images/pngegg.png";
import IconDocument from "../images/document.png";

const BankContainer = styled.div`
  background-color: #fff;
  // padding: 18px 10px 29px;
  padding: 18px 36px 29px;
  letter-spacing: initial;
  line-height: initial;
  display: flex;
  align-items: center;
  gap: 28px;
  justify-content: space-evenly;

  @keyframes smoothAppear {
    from {
      opacity: 0;
      // transform: translateY(-5%);
    }
    to {
      opacity: 1;
      // transform: translateY(0);
    }
  }

  animation: smoothAppear 1.5s ease;
`;

const BankButton = styled.button`
  background-color: #fff;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.16);
  color: #000;
  border: none;
  border-radius: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 176px;
  padding: 11px 0px 12px 0px;
  cursor: pointer;
  font-size: 0.9em;
  border: 0.5px solid #707070;
`;

const KakaoButton = styled.button`
  background-color: #fee500;
  box-shadow: -4px 7px 10px 0px rgba(51, 51, 51, 0.1);
  color: #000;
  border: none;
  border-radius: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 176px;
  padding: 11px 0px 12px 0px;
  cursor: pointer;
  font-size: 0.9em;
`;

const BankItem = ({
  sex,
  item
}: {
  sex: "male" | "female";
  item: { label: string; name: string; bank: string } | undefined;
}) => {
  if (!item) return null;

  return (
    <BankContainer>
      <Symbol $backcolor={sex === "male" ? "#EAF0FF" : "#FAEFEF"}>
        {item.name}
      </Symbol>

      <div
        style={{
          width: "100%",
          display: "flex",
          //   flexWrap: "nowrap",
          flexDirection: "column",
          justifyContent: "center",
          gap: "15px",
          alignItems: 'center'
        }}
      >
        {["신랑", "신부"].includes(item.label) && (
          <KakaoButton
            onClick={() => {
              window.open(item.label === '신부' ? 'https://qr.kakaopay.com/FSGetpQBl' : "https://qr.kakaopay.com/Ej7jXKLag");
            }}
          >
            <img
              alt="kakao"
              src={kakaoImage}
              style={{ width: "1em", height: "1em", marginRight: "4px" }}
            />
            카카오페이 송금
          </KakaoButton>
        )}
        
        <CopyToClipboard
          text={item.bank}
          onCopy={() => alert('계좌번호가 복사되었습니다 :)')}
        >
          <BankButton>
            <img src={IconDocument} alt='' style={{ fontSize: "1.25em", marginRight: "4px", width: '20px', height: '20px' }}/>
            
            계좌번호 복사
          </BankButton>
        </CopyToClipboard>
      </div>
    </BankContainer>
  );
};

const Symbol = styled.div<{ $backcolor: string }>`
  width: 86px;
  min-width: 86px;
  height: 86px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  background-color: ${({ $backcolor }) => $backcolor};
  cursor: pointer;
`;

const Div1 = styled.div`
  font-size: 1.74em;
  line-height: 1.35em;
  margin: 29px 0;
`

const Div2 = styled.div`
  line-height: 1.35em;
  margin-bottom: 29px;
  font-size: 1.14em;
`;


function Account() {
  const [maleAccount, setMaleAccount] = useState("");
  const [femaleAccount, setFemaleAccount] = useState("");

  const onResetSecond = useCallback(() => {
    setMaleAccount("");
  }, []);

  const onResetFemaleSecond = useCallback(() => {
    setFemaleAccount("");
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

  return (
    <Div ref={target} $isvisible={figure.toString()}>
      <Title>ACCOUNT</Title>

      <Div1>마음 전하실 곳</Div1>

      <Div2>
        필요하신 분들을 위해
        <br />
        안내드리니 양해 부탁드립니다.
        <br />
        참석하지 못하시더라도 축복해주시는
        <br />그 마음 감사히 간직하겠습니다.
      </Div2>
      <div style={{ display: "flex", flexDirection: 'column', flexWrap: "nowrap", gap: "24px", marginBottom: '60px' }}>
        <Accordion
          title="신랑측"
          theme="male"
          second={
            maleAccount ? (
              <BankItem
                sex="male"
                item={
                  {
                    child: {
                      label: "신랑",
                      name: "김태양",
                      bank: "신한 110-361-927627"
                    },
                    father: {
                      label: "아버지",
                      name: "김정국",
                      bank: "우리 1002-230-100521"
                    },
                    mother: {
                      label: "어머니",
                      name: "우춘화",
                      bank: "우리 1002-529-990429"
                    }
                  }[maleAccount]
                }
              />
            ) : null
          }
          onResetSecond={onResetSecond}
        >
          <BankContainer>
            <Symbol
              $backcolor="#EAF0FF"
              onClick={() => setMaleAccount("child")}
            >
              신랑
            </Symbol>

            <Symbol
              $backcolor="#EAF0FF"
              onClick={() => setMaleAccount("father")}
            >
              신랑
              <br />
              아버지
            </Symbol>

            <Symbol
              $backcolor="#EAF0FF"
              onClick={() => setMaleAccount("mother")}
            >
              신랑
              <br />
              어머니
            </Symbol>
          </BankContainer>
        </Accordion>

        <Accordion
          title="신부측"
          theme="female"
          second={
            femaleAccount ? (
              <BankItem
                sex="female"
                item={
                  {
                    child: {
                      label: "신부",
                      name: "우명균",
                      bank: "카카오뱅크 3333-16-0535823"
                    },
                    father: {
                      label: "아버지",
                      name: "우상헌",
                      bank: "카카오뱅크 3333-26-2970675"
                    },
                    mother: {
                      label: "어머니",
                      name: "김정희",
                      bank: "카카오뱅크 3333-27-8100236"
                    }
                  }[femaleAccount]
                }
              />
            ) : null
          }
          onResetSecond={onResetFemaleSecond}
        >
          <BankContainer>
            <Symbol
              $backcolor="#FAEFEF"
              onClick={() => setFemaleAccount("child")}
            >
              신부
            </Symbol>

            <Symbol
              $backcolor="#FAEFEF"
              onClick={() => setFemaleAccount("father")}
            >
              신부
              <br />
              아버지
            </Symbol>

            <Symbol
              $backcolor="#FAEFEF"
              onClick={() => setFemaleAccount("mother")}
            >
              신부
              <br />
              어머니
            </Symbol>
          </BankContainer>
        </Accordion>
      </div>
    </Div>
  );
}

export default Account;
