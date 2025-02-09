import styled from "styled-components";
import search from "../../assets/search.svg";

const SearchContainer = styled.div`
  justify-self: center;
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  height: 100%;
  width: 80%;
  border-radius: 15px;
  border: 2px solid gold;
  background-color: #4c3f20;
  color: gold;
  padding-left: 28px;
`;

const SearchIcon = styled.img`
  filter: invert(80%) sepia(45%) saturate(1131%) hue-rotate(358deg)
    brightness(101%) contrast(105%);
  width: 16px;
  height: 16px;
  position: absolute;
  left: 36px;
`;

function Search() {
  return (
    <SearchContainer>
      <SearchIcon src={search} />
      <SearchInput type="text" />
    </SearchContainer>
  );
}

export default Search;
