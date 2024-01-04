import React, {
  ReactNode,
  useCallback,
  useRef,
  useState,
  useEffect
} from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;

  background-color: #fff;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
`;

const Header = styled.div`
font-size: 20px;
font-weight: 700;
letter-spacing: 2px;
display: flex;
align-items: center;
height: 32px;
margin: 14px 36px 14px 36px;
`;

const Button = styled.div`
  right: 34px;
  position: absolute;

  transition: transform 1.5s ease;
`;

const ContentWrapper = styled.div`
  height: 0;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  transition: height 1.5s ease;

  background-color: #fff;
  
`;

const Content = styled.div<{ $bordertop: string }>`
  //   padding: 4px 8px;
  // padding-bottom: 4px;
  // @keyframes smoothAppear {
  //   from {
  //     opacity: 0;
  //     transform: translateY(-5%);
  //   }
  //   to {
  //     opacity: 1;
  //     transform: translateY(0);
  //   }
  // }

  // animation: smoothAppear 1.5s;
  border-top: ${({$bordertop}) => $bordertop};
  // border-top-width: 1px;
  // border-style: solid;
  // border-color: rgb(127, 151, 214);
`;
// border-top-width: ${({ iscollapse }) =>
//   iscollapse === "false" ? "0" : "1px"};
// transition-delay: 250ms;
// transition-property: border-top-width;

function Accordion({
  children,
  title,
  theme,
  second,
  onResetSecond
}: {
  children: ReactNode;
  title: ReactNode;
  theme: "male" | "female";
  second: ReactNode | null;
  onResetSecond: () => void;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  

  const [isCollapse, setIsCollapse] = useState(false);
  const [isSecond, setIsSecond] = useState(false);

  useEffect(() => {
    if (!!second && parentRef.current && childRef.current) {
      setIsSecond(!!second);
      parentRef.current.style.height = `${childRef.current.clientHeight}px`;
    }
  }, [second]);

  useEffect(() => {
    if (buttonRef.current) {
      if (isSecond) {
        buttonRef.current.style.transform = "rotate(90deg)";
      }
    }
  }, [isSecond]);

  const handleButtonClick = useCallback((e: any) => {
    e.stopPropagation();
    if (
      parentRef.current === null ||
      childRef.current === null ||
      buttonRef.current === null
    ) {
      return;
    }

    if (parentRef.current.clientHeight > 0) {
      parentRef.current.style.height = "0";
      buttonRef.current.style.transform = "rotate(0deg)";
    } else {
      parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      buttonRef.current.style.transform = "rotate(180deg)";
    }

    setIsCollapse(curr => !curr);
  }, []);

  const handleSecondButtonClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (
        parentRef.current === null ||
        childRef.current === null ||
        buttonRef.current === null
      ) {
        return;
      }
      onResetSecond();

      parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      buttonRef.current.style.transform = "rotate(180deg)";

      setIsSecond(false);
    },
    [onResetSecond]
  );

  return (
    <Container
      style={{
        border: `1px solid ${theme === "male" ? "#7F97D6" : "#D68080"}`
      }}
    >
      <Header
        onClick={isSecond ? handleSecondButtonClick : handleButtonClick}
        style={{ color: `${theme === "male" ? "#7F97D6" : "#D68080"}` }}
      >
        {title}
        {/* <Button ref={buttonRef}>{isCollapse ? "▲" : "▼"}</Button> */}
        <Button ref={buttonRef}>▼</Button>
      </Header>
      <ContentWrapper ref={parentRef}>
        <Content ref={childRef} $bordertop={`1px solid ${theme === "male" ? "#7F97D6" : "#D68080"}`}>
          {second || children}
        </Content>
      </ContentWrapper>
    </Container>
  );
}

export default Accordion;
