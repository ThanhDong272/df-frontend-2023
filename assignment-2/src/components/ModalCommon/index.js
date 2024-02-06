import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const ModalCommon = ({ title, children, isShowing, hide }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    console.log("IS SHOWING: ", isShowing);
  }, [isShowing]);

  const handleOverlayClick = (event) => {
    if (
      !event.target.closest(".modal-content") &&
      event.target !== modalRef.current
    ) {
      console.log("CLICKED INSIDE");
    } else {
      hide();
    }
  };

  return (
    <ModalOverlay
      ref={modalRef}
      onClick={handleOverlayClick}
      isShowing={isShowing}
    >
      <ModalWrapper>
        <ModalHeader>
          <TextH2>{title}</TextH2>
          <ButtonClose onClick={hide}>&times;</ButtonClose>
        </ModalHeader>
        {children}
      </ModalWrapper>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  display: ${(props) => (props.isShowing ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  border: 2px solid "#BAC9D4";
  box-sizing: border-box;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TextH2 = styled.h2``;

const ButtonClose = styled.span`
  color: #bac9d4;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export default ModalCommon;
