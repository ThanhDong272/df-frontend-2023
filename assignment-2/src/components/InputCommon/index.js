import React from "react";
import styled from "styled-components";

const InputCommon = (props) => {
  return <Input {...props} />;
};

const Input = styled.input`
  width: 240px;
  border: 2px solid #bac9d4;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 8px;
  transition: 0.5s;
  outline: none;

  &:focus {
    outline: none !important;
    border: 2px solid black;
  }
`;

export default InputCommon;
