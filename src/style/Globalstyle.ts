import { createGlobalStyle } from "styled-components";
import "../style/css/reset.css";
import "../style/css/common.css";

const Globalstyle = createGlobalStyle`

@font-face {
  font-family: "Pretendard";
  src: url("/fonts/Pretendard-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: "Pretendard";
  src: url("/fonts/Pretendard-Bold.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: 'BMJUA';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff');
}


* {
  margin: 0px;
  padding: 0px;
  outline-style: none;
  box-sizing: border-box;
}

a {
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
}

button {
  font-family: "Inter", "Pretendard", "BMJUA";
  font-weight: 300;
  font-style: normal;
  font-optical-sizing: auto;
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  overflow: visible;
  cursor: pointer;
}

html {
  overflow-x: hidden;
}

body,
* {
  font-family: "Inter", "Pretendard", "BMJUA";
  font-weight: 300;
  font-style: normal;
  font-optical-sizing: auto;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
}

/* a{
  font-family : "BMJUA"
} */
`;

export default Globalstyle;
