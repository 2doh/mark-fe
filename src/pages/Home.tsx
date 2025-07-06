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
import LoadingSpinner from "../components/common/Spinner";

const schema = z.object({
  keyword: z.string().optional(),
});
export type searchForm = z.infer<typeof schema>;

const Home = () => {
  const [products, setProducts] = useState<TradeMark[]>([]); // 전체 상품 리스트
  const [results, setResults] = useState<TradeMark[]>([]); // 검색 결과
  const [isLoading, setIsLoading] = useState(false);
  const [emptyFiltered, setEmptyFiltered] = useState(false);

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

  const formMethod = useForm<searchForm>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async ({ keyword }: searchForm) => {
    setIsLoading(true);
    const kw = normalizeFunc(keyword);

    setSearchParams({ q: kw });

    const filtered = products.filter(item => {
      const ko = normalizeFunc(item.productName).includes(kw);
      const en = normalizeFunc(item.productNameEng).includes(kw);
      return ko || en;
    });
    // console.log(ko);
    if (!filtered.length) {
      setEmptyFiltered(true);
    }
    if (filtered.length) {
      setEmptyFiltered(false);
    }
    setResults(filtered);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  useEffect(() => {
    const productList = async () => {
      setIsLoading(true);
      const result = await searchKeyword();
      if (result?.status !== 200) {
        return;
      }
      setProducts(result?.data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
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
  }, [keywordParam, products]);

  return (
    <HomeWrap>
      <FormProvider {...formMethod}>
        <HomeTop>
          <form onSubmit={formMethod.handleSubmit(onSubmit)} autoComplete="off">
            <SearchBar />
          </form>
        </HomeTop>
        {isLoading ? (
          <LoadingWrap>
            <LoadingSpinner />
          </LoadingWrap>
        ) : emptyFiltered ? (
          <EmptyMessage>검색 결과가 없습니다.</EmptyMessage>
        ) : (
          <HomeBottom>
            {listRender.slice(0, visibleCount).map((item, idx, arr) => {
              const isLast = idx === arr.length - 1;
              return (
                <div
                  key={item.applicationNumber}
                  ref={isLast ? lastCardRef : undefined}
                >
                  <TradeMarkCard data={item} />
                </div>
              );
            })}
          </HomeBottom>
        )}
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

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

const EmptyMessage = styled.p`
  text-align: center;
  padding: 40px 0;
  color: ${({ theme }) => theme.colors.warning};
  font-size: 1.5rem;
`;
