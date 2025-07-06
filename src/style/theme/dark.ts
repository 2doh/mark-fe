import { colorsTheme } from "../colorsTheme";
import moonIcon from "../../assets/icons/dark/moon.svg";
import arrowToTop from "../../assets/icons/dark/arrow-up-to-line.svg";
import arrowToDown from "../../assets/icons/dark/arrow-down-to-line.svg";
import menu from "../../assets/icons/dark/menu.svg";
import search from "../../assets/icons/dark/search.svg";
import star from "../../assets/icons/dark/star.svg";
import sun from "../../assets/icons/dark/sun.svg";
import x from "../../assets/icons/dark/x.svg";
import brightStar from "../../assets/icons/dark/material-symbols--star-rounded.svg";

export const darkTheme = {
  mode: "dark",
  colors: {
    bg: `${colorsTheme.lightBlack}`,
    text: `${colorsTheme.white}`,
    primary: `${colorsTheme.primaryDark}`,
    hover: `${colorsTheme.stroke}`,
  },
  icons: {
    moon: moonIcon,
    arrowToTop: arrowToTop,
    arrowToDown: arrowToDown,
    menu: menu,
    search: search,
    star: star,
    sun: sun,
    x: x,
    brightStar: brightStar,
  },
};
