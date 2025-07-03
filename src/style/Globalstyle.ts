import { createGlobalStyle } from "styled-components";
import "../style/css/reset.css";
import "../style/css/common.css";

const Globalstyle = createGlobalStyle`

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
  font-family: "Inter", "Pretendard", sans-serif;
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
  font-family: "Inter", "Pretendard", sans-serif;
  font-weight: 300;
  font-style: normal;
  font-optical-sizing: auto;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
}
`;

export default Globalstyle;
