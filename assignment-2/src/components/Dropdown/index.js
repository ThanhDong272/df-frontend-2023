import React from "react";
import styled from "styled-components";

import { DATA_TOPIC } from "../../data";

const Dropdown = ({ valueSelected, setValueSelected }) => {
  return (
    <DropdownContainer
      defaultValue={valueSelected}
      onChange={(event) => {
        console.log("OPTION SELECTED: ", event.target.value);
        setValueSelected(event.target.value);
      }}
    >
      {DATA_TOPIC?.map((item) => {
        return (
          <OptionValue
            key={item.id}
            value={item.name}
            selected={item?.selected}
          >
            {item.name}
          </OptionValue>
        );
      })}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.select`
  width: 200px;
  padding: 8px;
  border: 2px solid #bac9d4;
  border-radius: 4px;
  margin-bottom: 28px;
  cursor: pointer;

  &::-ms-expand {
    display: none;
  }
  &::after {
    content: "";
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
  }
`;

const OptionValue = styled.option``;

export default Dropdown;
