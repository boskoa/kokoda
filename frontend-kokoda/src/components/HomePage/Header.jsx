import styled from "styled-components";

const HeaderMenuContainer = styled.header`
  position: sticky;
  top: 0px;
  height: 40px;
  margin-top: 0px;
  z-index: 2;
  display: flex;
  background-color: rgb(0, 128, 128, 0.5);
  backdrop-filter: blur(10px);
`;

function Header() {
  return (
    <HeaderMenuContainer>
      <h2>HEADER</h2>
    </HeaderMenuContainer>
  );
}

export default Header;
