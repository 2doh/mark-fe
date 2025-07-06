import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { searchKeyword } from "../apis/searchAPI";
import { TradeMark } from "../interface/tradeMarkInterface";
import TradeMarkCard from "../components/TradeMarkCard";
import LoadingSpinner from "../components/common/Spinner";

const BookmarkPage = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [bookmarks, setBookMarks] = useState<TradeMark[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const result = await searchKeyword();
      if (result?.status !== 200) {
        return;
      }
      const bookmarkList = JSON.parse(localStorage.getItem("bookmark") || "[]");
      if (bookmarkList.length === 0) {
        setIsEmpty(true);
      }
      const filtered = result.data.filter((item: TradeMark) =>
        bookmarkList?.includes(String(item.applicationNumber)),
      );

      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
      setBookMarks(filtered);
    };
    getData();
  }, []);

  return (
    <PageWrap>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {" "}
          {isEmpty ? (
            <div>북마크된 항목이 없습니다.</div>
          ) : (
            <>
              {bookmarks.map(item => (
                <TradeMarkCard key={item.applicationNumber} data={item} />
              ))}
            </>
          )}
        </>
      )}
    </PageWrap>
  );
};

export default BookmarkPage;

const PageWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
`;
