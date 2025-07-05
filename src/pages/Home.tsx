import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
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

  const [visibleCount, setVisibleCount] = useState(20);
  const observer = useRef<IntersectionObserver | null>(null);

  const listRender = results.length ? results : products;
  const lastCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => {
            // listToRender.length를 초과하지 않도록
            const next = Math.min(prev + 20, listRender.length);
            return next;
          });
        }
      });

      observer.current.observe(node);
    },
    [listRender.length],
  );

  console.log(listRender.length);

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
          {listRender.slice(0, visibleCount).map((item, idx, arr) => {
            const isLast = idx === arr.length - 1;

            return (
              <div
                key={item.applicationNumber} // 고유키
                ref={isLast ? lastCardRef : undefined}
              >
                <TradeMarkCard item={item} />
              </div>
            );
          })}
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
  width: 100%;
`;
