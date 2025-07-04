import React from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";

const FormBox = () => {
  return (
    <FormWrap>
      <SearchBar></SearchBar>
    </FormWrap>
  );
};

export default FormBox;

const FormWrap = styled.form``;
