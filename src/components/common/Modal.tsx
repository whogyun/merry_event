import React, { ReactNode, useEffect, useState } from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  // display: relative;
  // min-width:
  // position: fixed;
  background-color: rgb(0, 0, 0, 0.3);

  z-index: 50;
  // width: 100%;
  // height: 100%;

  //     width: 100%;
  //   height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Container = styled.div`
//   background-color: #fff;
`;

function Modal({
  children,
  open = false,
  onClose,
  disableBackClick=false
}: {
  children: ReactNode;
  open?: boolean;
  onClose: () => void;
  disableBackClick?: boolean;
}) {
  const [modalOpen, setModalOpen] = useState(open);

  useEffect(() => {
    setModalOpen(open);
  }, [open]);

  return (
    <Wrapper
    // style={{display: modalOpen ? 'flex' : 'none'}}
    style={{visibility: modalOpen ? 'visible' : 'hidden'}}
      onClick={() => {
        if (!disableBackClick) {
          console.log("background click");
          setModalOpen(false);
          onClose();
        }
      }}
    >
      <Container
        onClick={e => {
          e.stopPropagation();
          console.log("container click");
        }}
      >
        {children}
      </Container>
    </Wrapper>
  )
}

export default Modal;
