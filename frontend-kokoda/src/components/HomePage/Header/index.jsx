import styled from "styled-components";
import Logo from "./Logo";
import MenuButton from "./MenuButton";

const HeaderMenuContainer = styled.header`
  position: sticky;
  top: 0px;
  height: 40px;
  margin-top: 0px;
  margin-bottom: 5px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 128, 128, 0.5);
  backdrop-filter: blur(10px);
`;

function Header({ setMenu }) {
  return (
    <HeaderMenuContainer>
      <Logo />
      <MenuButton setMenu={setMenu} />
    </HeaderMenuContainer>
  );
}

export default Header;
