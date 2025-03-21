import styled from "styled-components";
import search from "../../assets/search.svg";

const SearchContainer = styled.label`
  justify-self: center;
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  position: relative;
  left: -8px;
  height: 100%;
  width: 280px;
  border-radius: 15px;
  border: 2px solid gold;
  background-color: #4c3f20;
  color: gold;
  padding-left: 24px;

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.img`
  filter: invert(80%) sepia(45%) saturate(1131%) hue-rotate(358deg)
    brightness(101%) contrast(105%);
  width: 16px;
  height: 16px;
  position: relative;
  left: 13px;
  z-index: 2;
`;

function Search({ filter, setFilter }) {
  return (
    <SearchContainer>
      <SearchIcon src={search} alt="search-icon" />
      <SearchInput
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value.toLowerCase())}
      />
    </SearchContainer>
  );
}

export default Search;
