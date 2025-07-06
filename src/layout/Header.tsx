import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes, useTheme } from "styled-components";
import ThemeBtn from "../components/button/ThemeBtn";
import { flexCenter } from "../style/mixin";
import { useEffect, useState } from "react";

const Header = () => {
  const currentTheme = useTheme();
  const imgObj = [currentTheme.icons.star];
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 500);
  const navi = useNavigate();

  const handleMenuOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMenuOpen === true) {
      setIsMenuOpen(false);
      return;
    }
    if (isMenuOpen === false) {
      setIsMenuOpen(true);
      return;
    }
  };

  const handleBtnClick = (data: string) => {
    if (data === currentTheme.icons.star) {
      navi("/bookmark");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 500);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HeaderWrap>
      <HeaderInner>
        {!isMenuOpen && <LogoStyle to="/">Mark</LogoStyle>}
        {(isMenuOpen === true || isDesktop) && (
          <BtnWrap>
            <ThemeBtn />
            {imgObj.map(data => (
              <BtnStyle
                key={data}
                onClick={() => {
                  handleBtnClick(data);
                }}
              >
                <img src={data} />
              </BtnStyle>
            ))}
          </BtnWrap>
        )}
        {!isDesktop && (
          <MenuBtn onClick={e => handleMenuOpen(e)}>
            <img
              src={
                isMenuOpen === false
                  ? currentTheme.icons.menu
                  : currentTheme.icons.x
              }
            />
          </MenuBtn>
        )}
      </HeaderInner>
    </HeaderWrap>
  );
};

export default Header;

const HeaderWrap = styled.div`
  ${flexCenter}
  padding: 20px 50px 60px;
  @media screen and (max-width: 499px) {
    padding: 20px 10px 60px;
  }
`;

const HeaderInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  min-height: 87px;
`;

const shake = keyframes`
  0% {transform : scale(1) rotate(0deg)}
  30% {transform : scale(1.1) rotate(3deg)}
  60% {transform : scale(0.95) rotate(-2deg)}
  100% {transform : scale(1) rotate(0deg)}
`;

const LogoStyle = styled(Link)`
  font-size: 2rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  ${flexCenter}

  &:hover {
    animation: ${shake} 0.5s ease-out forwards;
    text-shadow: 1px 1px 20px rgba(255, 255, 255, 0.7);
  }
`;

const BtnWrap = styled.ul`
  ${flexCenter}
  gap: 10px;
`;

const MenuBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  img {
    box-sizing: content-box;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    padding: 8px;
  }
  &:hover img {
    filter: invert(1);
  }
`;

export const BtnStyle = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  img {
    box-sizing: content-box;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    padding: 8px;
  }
  &:hover img {
    filter: invert(1);
  }
`;
