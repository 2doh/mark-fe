import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: string;

    colors: {
      bg: string;
      text: string;
      primary: string;
    };

    icons: {
      moon: string;
      arrowToTop: string;
      arrowToDown: string;
      image: string;
      menu: string;
      search: string;
      star: string;
      sun: string;
      x: string;
    };
  }
}
