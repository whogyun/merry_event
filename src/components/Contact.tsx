import React, {useState, useEffect, useRef, useCallback} from "react";
import styled from "styled-components";
import Div from "./common/Div";
import Modal from "./common/Modal";
import Title from "./common/Title";

import {CloseRounded } from "@material-ui/icons";


import manFace from "../images/man_face.jpg";
import womenFace from "../images/women_face.jpg";

import iconPhone from "../images/phone.png";

import iconEmail from "../images/email.png";
import iconTelephone from "../images/telephone.png";




const ModalIcon = styled("div")`
  width: 137px;
  border-radius: 50%;
  height: 137px;
  
  margin-bottom: 15px;
`;
const PositionText = styled("div")`
font-size: 0.55em;
line-height: 1em;
  letter-spacing: 0.5em;
  color: #868383;
  margin-bottom: 16px;
`;
const ModalButton = styled("button")`
height: 33px;
width: 112px;
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

const ModalWrapper = styled("div")`
  display: flex;
  justify-content: center;
  gap: 28px;
  margin-bottom: 50px;
  position: relative;

  &::after {
    content: '';
    width: 58px;
    height: 0.5px;
    background-color: #707070;

    position: absolute;
    top: 150px;
  }
`;

const ContactListContainer = styled.div<{$sex: string}>`
background-color: ${({ $sex }) => ($sex === 'male' ? "#EDF2FF" : "#F8EFEF")};

  
  border-radius: 31px;
  padding: 0px 15px 0px 45px;
  position: relative;
  
  &::before {
    content:'';
    position: absolute;
    left: 45px;
    width: 1px;
    height: 100%;
    background-color:${({ $sex }) => ($sex === 'male' ? "#7F97D6" : "#D68080")};
  }
  // > * + * {
  //   margin-top: 10px;
  // }
`;

const ContactItem = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: nowrap;
  line-height: 3em;
  justify-content: space-between;
`;

const Div1 = styled.div`
line-height: 1.3em;
margin: 16px 0 29px;
`;

const Ul = styled.ul`
padding: 20px 30px;
margin: 0;
 list-style-type: '- ';
`;


function Contact() {
  const [open, setOpen] = useState("");

  const handleModalClose = useCallback(() => {
    setOpen("");
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
    <>
    <Div ref={target} $isvisible={figure.toString()}>
      <Title>CONTACT</Title>

      <Div1>전화로 축하인사 하기</Div1>
      
      <ModalWrapper>
        <div>
          <ModalIcon style={{background: `url(${womenFace})`,backgroundSize: 'cover'}} />
          <PositionText>BRIDE</PositionText>
          <div>우명균</div>
          <ModalButton onClick={() => setOpen(curr => (!!curr ? "" : "female"))}>
            <img src={iconPhone} alt='phone' style={{width: '17px', height: '17px'}}/>
            신부측
          </ModalButton>
        </div>

        <div>
          <ModalIcon style={{background: `url(${manFace})`,backgroundSize: 'cover'}} />
          <PositionText>GROOM</PositionText>
          <div>김태양</div>
          <ModalButton onClick={() => setOpen(curr => (!!curr ? "" : "male"))}>
            <img src={iconPhone} alt='phone'  style={{width: '17px', height: '17px'}}/>
            신랑측
          </ModalButton>
        </div>
          
      </ModalWrapper>
      
    </Div>
      <Modal open={!!open} onClose={handleModalClose}>
        <ContactListContainer $sex={open}>
          {/* <div style={{textAlign: 'end'}}>
          <IconButton disableRipple style={{alignSelf: 'right', padding: 0}} onClick={() => setOpen('')}><CloseRounded /></IconButton>
          </div> */}
          <div style={{height: '117px', position: 'relative'}}>
          <div style={{height: '76px', position: 'absolute', left: '-0.5em', bottom: 0, display: 'flex', alignItems: 'center', backgroundColor: open === 'male' ? "#EDF2FF" : "#F8EFEF", color:open === 'male' ? "#7F97D6" : "#D68080", fontFamily: 'Bodoni 72', fontSize: '1.4em', letterSpacing: '0.5em'}}>
          {open === 'male' ? 'GROOM': 'BRIDE'}
          </div>
          </div>
          <Ul>
            {{
              male: [
                { label: "신랑", name: "김태양", phone: "01098008346" },
                { label: "신랑 아버지", name: "김정국", phone: "01024338346" },
                { label: "신랑 어머니", name: "우춘화", phone: "01053538346" }
              ],
              female: [
                { label: "신부", name: "우명균", phone: "01032216451" },
                { label: "신부 아버지", name: "우상헌", phone: "01055703870" },
                { label: "신부 어머니", name: "김정희", phone: "01087625272" }
              ]
            }[open]?.map(({ label, name, phone }, idx) => (
              <li key={idx} style={{listStyle: '-'}}>
              <ContactItem >
                
                <div>
                  <span style={{ fontSize: '0.9em', marginRight: "4px" }}>{label}</span>
                  <span style={{ fontSize: '1.4em' }}>
                    {name}
                  </span>
                </div>

                <div
                  style={{
                    lineHeight: "1em"
                  }}
                >
                  <span
                    style={{
                      marginRight: "15px"
                    }}
                    onClick={() => {
                      document.location.href = `tel:${phone}`;
                    }}
                  >
            <img src={iconTelephone} alt='telephone' style={{width: '20px', height: '20px'}}/>
                    
                  </span>
                  <span
                    onClick={() => {
                      document.location.href = `sms:${phone}`;
                    }}
                  >
                    <img src={iconEmail} alt='email' style={{width: '20px', height: '20px'}}/>
                  </span>
                </div>
              </ContactItem>
              </li>
            ))}
          </Ul>
        </ContactListContainer>
      </Modal>
      </>
  );
}

export default Contact;
