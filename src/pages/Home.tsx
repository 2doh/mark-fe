import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import z from "zod";
import { searchKeyword } from "../apis/searchAPI";
import SearchBar from "../components/SearchBar";
import { TradeMark } from "../interface/tradeMarkInterface";
import { normalizeFunc } from "../utils/normalize";

const schema = z.object({
  keyword: z.string().min(1, "검색어를 입력해 주세요."),
});
export type searchForm = z.infer<typeof schema>;

const Home = () => {
  const [results, setResults] = useState<TradeMark[]>([]);

  const formMethod = useForm<searchForm>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async ({ keyword }: searchForm) => {
    const result = await searchKeyword();
    if (result?.status !== 200) {
      return;
    }

    const kw = normalizeFunc(keyword);

    const filtered = result.data.filter(item => {
      const ko = normalizeFunc(item.productName).includes(kw);
      const en = normalizeFunc(item.productNameEng).includes(kw);
      return ko || en;
    });

    console.log(filtered);
    setResults(filtered);
  };

  return (
    <HomeWrap>
      <HomeTop>
        <FormProvider {...formMethod}>
          <FormWrap onSubmit={formMethod.handleSubmit(onSubmit)}>
            <SearchBar />
          </FormWrap>
        </FormProvider>
      </HomeTop>
      <HomeBottom></HomeBottom>
    </HomeWrap>
  );
};

export default Home;

const HomeWrap = styled.div``;

const HomeTop = styled.div``;

const HomeBottom = styled.div``;

const FormWrap = styled.form``;
