import React from "react";
import styled from "styled-components";
import { flexCenter } from "../style/mixin";

const Header = () => {
  return <HeaderWrap>Header</HeaderWrap>;
};

export default Header;

const HeaderWrap = styled.div`
  ${flexCenter}
  margin: 20px 40px 60px;
`;
