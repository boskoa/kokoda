import styled from "styled-components";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import FooterMenu from "./FooterMenu";
import { Outlet, useNavigate } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../features/login/loginSlice";

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

const WS_URL = "ws://127.0.0.1:3003/websockets";

function HomePage() {
  const [menu, setMenu] = useState(false);
  const loggedUser = useSelector(selectLoggedUser);
  const navigate = useNavigate();
  const { sendMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    retryOnError: true,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (!loggedUser) {
      navigate("/authentication/login");
    }
  }, [loggedUser]);

  if (!loggedUser) return null;

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
