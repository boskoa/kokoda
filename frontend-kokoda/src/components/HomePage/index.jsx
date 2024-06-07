import styled from "styled-components";
import ViewPort from "../ViewPort";
import { useState } from "react";

const HomeContainer = styled.div`
  background-color: ${({ theme }) => theme.main.bg};
  color: ${({ theme }) => theme.main.fg};
  min-height: 180%;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 40px;
  z-index: 1;
`;

const FooterMenu = styled.div`
  position: sticky;
  bottom: 0px;
  height: 40px;
  margin-top: -40px;
  background-color: teal;
  z-index: 2;
`;

const MenuButton = styled.button`
  position: sticky;
  bottom: 96%;
  left: 86%;
  height: 20px;
  width: 50px;
  margin-top: -20px;
  z-index: 2;
`;

const Menu = styled.div`
  height: 100%;
  width: 70%;
  background-color: lime;
  position: sticky;
  left: 30%;
  bottom: 0px;
  transform: ${({ $show }) => ($show ? "translateX(0%)" : "translateX(100%)")};
  transition: all 0.4s;
  opacity: 0.7;
  z-index: 1;
`;

function HomePage() {
  const [menu, setMenu] = useState(false);

  return (
    <ViewPort>
      <HomeContainer>HAI MARK</HomeContainer>
      <Menu $show={menu} />
      <MenuButton onClick={() => setMenu((p) => !p)}>
        {menu ? "hide" : "show"}
      </MenuButton>
      <FooterMenu />
    </ViewPort>
  );
}

export default HomePage;
