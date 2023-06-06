import React from "react";
import styled from "styled-components";
const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
}))`
  height: 30px;
  width: max-content;
  border: none;
  padding: 0 10px 0 6px;
  background-color: white;
  box-shadow: none;
  font-size: 12px;
  border-radius:0px
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 30px;
  border: none;
  width: 32px;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const FilterComponent = ({ filterText, onFilter, onClear, PlaceHolder }) => (
  <>
    <Input
      id="search"
      type="text"
      placeholder={PlaceHolder}
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton onClick={onClear}>X</ClearButton>
  </>
);

export default FilterComponent;
