import React from "react";
import styled, { useTheme } from "styled-components";
import { colorsTheme } from "../style/colorsTheme";
import { TradeMark } from "../interface/tradeMarkInterface";

interface Props {
  item: TradeMark;
}

export default function TradeMarkCard({ item }: Props) {
  const theme = useTheme();

  const fields = [
    ["출원번호", item.applicationNumber],
    ["출원일", item.applicationDate],
    ["상태", item.registerStatus],
  ];

  return (
    <Card>
      <Bookmark>
        <img src={theme.icons.star} alt="bookmark icon" />
      </Bookmark>
      <Title>{item.productName ? item.productName : "null"}</Title>
      {fields.map(([item, value]) => (
        <Content key={value}>
          <Label>{item}</Label>
          <Value>{value}</Value>
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
