import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const Main = () => {
  return (
    <>
      <Header />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
};

const ContentWrapper = styled.main`
  padding: 0 50px;
  /* min-height: 100vh; */
`;

export default Main;
