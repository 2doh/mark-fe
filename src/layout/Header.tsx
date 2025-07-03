import React from "react";
import styled, { keyframes } from "styled-components";
import { flexCenter } from "../style/mixin";
import { Link } from "react-router-dom";
import ThemeBtn from "../components/button/ThemeBtn";

const Header = () => {
  return (
    <HeaderWrap>
      <HeaderInner>
        <LogoStyle to="/">Mark</LogoStyle>
        <BtnWrap>
          <ThemeBtn />
        </BtnWrap>
      </HeaderInner>
    </HeaderWrap>
  );
};

export default Header;

const HeaderWrap = styled.div`
  ${flexCenter}
  padding: 20px 40px 60px;
`;

const HeaderInner = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const shake = keyframes`
  0% {transform : scale(1) rotate(0deg)}
  30% {transform : scale(1.1) rotate(3deg)}
  60% {transform : scale(0.95) rotate(-2deg)}
  100% {transform : scale(1) rotate(0deg)}
`;

const LogoStyle = styled(Link)`
  font-size: 1.7rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    animation: ${shake} 0.5s ease-out forwards;
    text-shadow: 1px 1px 10px rgba(255, 255, 255, 0.7);
  }
`;

const BtnWrap = styled.div`
  ${flexCenter}
`;
