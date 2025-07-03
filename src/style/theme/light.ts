import { colorsTheme } from "../colorsTheme";
import moonIcon from "../../assets/icons/light/moon.svg";
import arrowToTop from "../../assets/icons/light/arrow-up-to-line.svg";
import arrowToDown from "../../assets/icons/light/arrow-down-to-line.svg";
import image from "../../assets/icons/light/image.svg";
import menu from "../../assets/icons/light/menu.svg";
import search from "../../assets/icons/light/search.svg";
import star from "../../assets/icons/light/star.svg";
import sun from "../../assets/icons/light/sun.svg";
import x from "../../assets/icons/light/x.svg";

export const lightTheme = {
  mode: "light",
  colors: {
    bg: "#fff",
    text: `${colorsTheme.font}`,
    primary: `${colorsTheme.primary}`,
  },
  icons: {
    moon: moonIcon,
    arrowToTop: arrowToTop,
    arrowToDown: arrowToDown,
    image: image,
    menu: menu,
    search: search,
    star: star,
    sun: sun,
    x: x,
  },
};
