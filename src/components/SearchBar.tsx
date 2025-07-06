import styled, { useTheme } from "styled-components";
import { colorsTheme } from "../style/colorsTheme";
import { flexCenter } from "../style/mixin";
import usePlaceholder from "../hooks/usePlaceholder";
import { useFormContext } from "react-hook-form";

const SearchBar = () => {
  const currentTheme = useTheme();

  const { setValue, watch } = useFormContext();
  const keywordValue = watch("keyword");

  const { handleFocus, handleBlur, placeholder } =
    usePlaceholder("검색어를 입력해 주세요.");

  const { register } = useFormContext();

  const handleCancelBtn = () => {
    setValue("keyword", "");
    handleBlur();
  };

  return (
    <SearchBarWrap>
      <img src={currentTheme.icons.search} alt="검색 아이콘" />
      <InputStyle
        {...register("keyword")}
        placeholder={placeholder}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
      />
      {keywordValue && (
        <img
          src={currentTheme.icons.x}
          alt="취소 아이콘"
          onClick={() => handleCancelBtn()}
          style={{ cursor: "pointer" }}
        />
      )}
    </SearchBarWrap>
  );
};

export default SearchBar;

const SearchBarWrap = styled.div`
  width: 100%;
  height: 48px;
  ${flexCenter}
  border-radius: 24px;
  border: 2px solid ${colorsTheme.stroke};
  overflow: hidden;
  img {
    margin: 20px;
  }
  &:focus-within {
    /* border: 2px solid ${({ theme }) => theme.colors.primary}; */
    filter: drop-shadow(1px 1px 20px ${({ theme }) => theme.colors.primary});
  }
`;

const InputStyle = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  font-size: 1rem;
`;
