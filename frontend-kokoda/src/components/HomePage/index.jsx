import styled from "styled-components";
import ViewPort from "../ViewPort";
import { useState } from "react";
import Menu from "./Menu";
import FooterMenu from "./FooterMenu";
import { Outlet } from "react-router-dom";

const HomeContainer = styled.div`
  background-color: transparent;
  color: ${({ theme }) => theme.main.fg};
  min-height: 100%;
  position: relative;
  //overflow-x: hidden;
  padding-bottom: 40px;
  z-index: 1;
`;

const MenuButton = styled.button`
  float: right;
  margin-right: 10px;
  position: sticky;
  top: 10px;
  height: 20px;
  width: 50px;
  margin-bottom: -20px;
  z-index: 3;
`;

function HomePage() {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <MenuButton onClick={() => setMenu((p) => !p)}>
        {menu ? "hide" : "show"}
      </MenuButton>
      <HomeContainer>
        <Outlet />
      </HomeContainer>
      <Menu menu={menu} />
      <FooterMenu />
    </>
  );
}

export default HomePage;
