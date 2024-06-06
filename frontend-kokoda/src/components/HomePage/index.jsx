import styled from "styled-components";
import ViewPort from "../ViewPort";
import { useState } from "react";

const HomeContainer = styled.div`
  background-color: ${({ theme }) => theme.main.bg};
  color: ${({ theme }) => theme.main.fg};
  min-height: 100%;
  position: relative;
  overflow-x: hidden;
`;

const FooterMenu = styled.div`
  height: 40px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: teal;
`;

const MenuButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

const Menu = styled.div`
  height: 100%;
  width: 70%;
  background-color: lime;
  position: absolute;
  right: 0;
  top: 0;
  transform: ${({ show }) => (show ? "translateX(0%)" : "translateX(110%)")};
  transition: all 0.4s;
`;

function HomePage() {
  const [menu, setMenu] = useState(false);

  return (
    <ViewPort>
      <HomeContainer>
        HAI MARK
        <MenuButton onClick={() => setMenu((p) => !p)}>show</MenuButton>
        <Menu show={menu} />
        <FooterMenu />
      </HomeContainer>
    </ViewPort>
  );
}

export default HomePage;
