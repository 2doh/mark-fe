import React from "react";
import styled, { useTheme } from "styled-components";
import { useThemeStore } from "../../store/useThemeStore";

const ThemeBtn = () => {
  const currentTheme = useTheme();
  const { theme, setTheme } = useThemeStore();
  console.log(currentTheme);
  return (
    <ThemeBtnStyle>
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
