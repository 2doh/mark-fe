import React from "react";
import styled, { useTheme } from "styled-components";
import { colorsTheme } from "../style/colorsTheme";

const dummy = {
  name: "맥북",
  applicationNo: "402024000123",
  applicationDate: "2024‑03‑18",
  status: "등록",
};

const tempArr = ["상표명", "출원번호", "출원일", "상태"];

export default function TradeMarkCard() {
  const theme = useTheme();

  return (
    <Card>
      <Bookmark>
        <img src={theme.icons.star} alt="bookmark icon" />
      </Bookmark>
      <Title>{dummy.name}</Title>
      {tempArr.map((item, index) => (
        <Content key={index}>
          <Label>{item}</Label>
          <Value>{dummy.applicationNo}</Value>
        </Content>
      ))}
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${colorsTheme.stroke};
  border-radius: 1rem;
  padding: 2rem;
  cursor: pointer;
`;

const Bookmark = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
`;

const Content = styled.p`
  line-height: 1.25rem;
  font-size: 0.85rem;
`;

const Label = styled.span`
  font-weight: 600;
  margin-right: 0.3rem;
  opacity: 0.75;
`;

const Value = styled.span`
  font-weight: 500;
`;
