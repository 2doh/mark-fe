import React from "react";
import styled, { useTheme } from "styled-components";
import { useThemeStore } from "../../store/useThemeStore";

const ThemeBtn = () => {
  const currentTheme = useTheme();
  const { theme, setTheme } = useThemeStore();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (theme === "light") {
      setTheme("dark");
      return;
    }
    if (theme === "dark") {
      setTheme("light");
      return;
    }
  };

  return (
    <ThemeBtnStyle onClick={e => handleClick(e)}>
      <img
        src={
          theme === "light" ? currentTheme.icons.moon : currentTheme.icons.sun
        }
        alt={theme === "light" ? "다크 모드" : "라이트 모드"}
      />
    </ThemeBtnStyle>
  );
};

export default ThemeBtn;

const ThemeBtnStyle = styled.button``;
