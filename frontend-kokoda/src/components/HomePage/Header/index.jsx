import styled from "styled-components";
import Logo from "./Logo";
import MenuButton from "./MenuButton";
import Avatar from "./Avatar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

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
  background-color: rgba(0, 128, 128, 0.7);
  backdrop-filter: blur(20px);
  transform: ${({ $translate }) => $translate};
  transition: all 0.3s;
`;

function Header({ setMenu }) {
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <HeaderMenuContainer
      $translate={
        isNaN(pathArray[pathArray.length - 1]) ? "" : "translateY(-40px)"
      }
    >
      <Avatar />
      <Logo />
      <MenuButton setMenu={setMenu} />
    </HeaderMenuContainer>
  );
}

export default Header;
