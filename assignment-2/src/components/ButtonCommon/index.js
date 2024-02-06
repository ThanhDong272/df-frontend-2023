import React from "react";
import styled from "styled-components";

const ButtonCommon = (props) => {
  return (
    <Button {...props} className={props?.className}>
      {props?.title}
    </Button>
  );
};

const Button = styled.button`
  margin-left: 8px;
  border-radius: 4px;
  border: none;
  background-color: #d63b51;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 92px;

  &:hover {
    background-color: red;
    cursor: pointer;
  }
`;

export default ButtonCommon;
