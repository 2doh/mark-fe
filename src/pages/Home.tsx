import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import z from "zod";
import { searchKeyword } from "../apis/searchAPI";
import SearchBar from "../components/SearchBar";
import { TradeMark } from "../interface/tradeMarkInterface";
import { normalizeFunc } from "../utils/normalize";
import TradeMarkCard from "../components/TradeMarkCard";

const schema = z.object({
  keyword: z.string().optional(),
});
export type searchForm = z.infer<typeof schema>;

const Home = () => {
  const [products, setProducts] = useState<TradeMark[]>([]); // 전체 상품 리스트
  const [results, setResults] = useState<TradeMark[]>([]); // 검색 결과

  const [searchParams, setSearchParams] = useSearchParams();
  const keywordParam = searchParams.get("q") ?? "";

  const formMethod = useForm<searchForm>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async ({ keyword }: searchForm) => {
    const kw = normalizeFunc(keyword);
    setSearchParams({ q: kw });
    const filtered = products.filter(item => {
      const ko = normalizeFunc(item.productName).includes(kw);
      const en = normalizeFunc(item.productNameEng).includes(kw);
      return ko || en;
    });

    setResults(filtered);
  };

  useEffect(() => {
    const productList = async () => {
      const result = await searchKeyword();
      if (result?.status !== 200) {
        return;
      }
      setProducts(result?.data);
    };
    productList();
  }, []);

  // products 목록이 준비된 뒤 q가 존재한다면 자동검색
  useEffect(() => {
    // 데이터 없으면 리턴
    if (!products.length) return;
    if (!keywordParam) {
      setResults(products);
      return;
    }
    formMethod.setValue("keyword", keywordParam);
    onSubmit({ keyword: keywordParam });

    console.log(results);
    console.log(products);
  }, [keywordParam, products]);

  return (
    <HomeWrap>
      <FormProvider {...formMethod}>
        <HomeTop>
          <form onSubmit={formMethod.handleSubmit(onSubmit)}>
            <SearchBar />
          </form>
        </HomeTop>
        <HomeBottom>
          <TradeMarkCard />
        </HomeBottom>
      </FormProvider>
    </HomeWrap>
  );
};

export default Home;

const HomeWrap = styled.div``;

const HomeTop = styled.div``;

const HomeBottom = styled.div`
  margin-top: 20px;
  padding: 10px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 10px;
  width: 100%;
`;
