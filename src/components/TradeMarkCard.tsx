import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { colorsTheme } from "../style/colorsTheme";
import { TradeMark } from "../interface/tradeMarkInterface";

interface Props {
  data: TradeMark;
}

export default function TradeMarkCard({ data }: Props) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const theme = useTheme();
  const fields = [
    ["출원번호", data.applicationNumber],
    ["출원일", data.applicationDate],
    ["상태", data.registerStatus],
  ];

  const handleBookmark = (appNum: number | null | undefined) => {
    if (!appNum) return;

    const appNumStr = String(appNum);
    const bookmarkList = localStorage.getItem("bookmark");

    const list = bookmarkList ? JSON.parse(bookmarkList) : [];
    const findItem = list.includes(appNumStr);
    if (findItem) {
      const newList = list.filter((item: string) => item !== appNumStr);
      localStorage.setItem("bookmark", JSON.stringify(newList));
      setIsBookmarked(false);
    }
    if (!findItem) {
      const newList = [...list, appNumStr];
      localStorage.setItem("bookmark", JSON.stringify(newList));
      setIsBookmarked(true);
    }
  };

  useEffect(() => {
    const appNum = String(data.applicationNumber);
    const bookmarkList = localStorage.getItem("bookmark");
    const list: string[] = bookmarkList ? JSON.parse(bookmarkList) : [];
    setIsBookmarked(list.includes(appNum));
  }, [isBookmarked]);

  return (
    <Card>
      <Bookmark
        onClick={() => {
          handleBookmark(data.applicationNumber);
        }}
        type="button"
      >
        <img
          src={isBookmarked ? theme.icons.brightStar : theme.icons.star}
          alt="bookmark icon"
        />
      </Bookmark>
      <Title>{data.productName ? data.productName : "null"}</Title>
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
  /* cursor: pointer; */
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
