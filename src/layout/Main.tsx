import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const Main = () => {
  return (
    <Wrapper>
      <Header />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </Wrapper>
  );
};

export default Main;

const ContentWrapper = styled.main`
  padding: 0 50px;
  /* min-height: 100vh; */
  @media screen and (max-width: 499px) {
    padding: 0 10px;
  }
`;

const Wrapper = styled.div`
  max-width: 1440px;
  padding: 0 100px;
  margin: 0 auto;
  @media screen and (max-width: 1425px) {
    padding: 0 0;
  }
`;
