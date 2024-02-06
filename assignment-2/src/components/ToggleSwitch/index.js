import React, { useState } from "react";
import styled from "styled-components";

const ToggleSwitch = ({ checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked);
  };

  return (
    <Switch>
      <Input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <Slider />
    </Switch>
  );
};

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #dde3e9;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Input = styled.input`
  display: none;

  &:checked + ${Slider} {
    background-color: #d53b51;
  }

  &:checked + ${Slider}:before {
    -webkit-transform: translateX(22px);
    -ms-transform: translateX(22px);
    transform: translateX(22px);
  }
`;

export default ToggleSwitch;
