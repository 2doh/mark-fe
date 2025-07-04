import React from "react";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";
import FormBox from "../components/FormBox";

const Home = () => {
  return (
    <HomeWrap>
      <HomeTop>
        <FormBox></FormBox>
      </HomeTop>
      <HomeBottom></HomeBottom>
    </HomeWrap>
  );
};

export default Home;

const HomeWrap = styled.div``;

const HomeTop = styled.div``;

const HomeBottom = styled.div``;
