import styled from "styled-components";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Menu from "./Menu";
import FooterMenu from "./FooterMenu";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../../features/login/loginSlice";
import Header from "./Header";
import useWebSocket from "react-use-websocket";
import WSContext from "./wsContext";
import { addSocketMessage } from "../../features/chats/chatsSlice";
import {
  getAllUnseen,
  selectAllUnseen,
  updateUnseen,
} from "../../features/unseen/unseenSlice";

const HomeContainer = styled.div`
  background-color: transparent;
  color: ${({ theme }) => theme.main.fg};
  min-height: calc(100% - 45px);
  width: inherit;
  position: relative;
  padding-bottom: 40px;
  z-index: 1;
`;

const WS_URL = "ws://127.0.0.1:3003/websockets";

function HomePage() {
  const [menu, setMenu] = useState(false);
  const loggedUser = useSelector(selectLoggedUser);
  const unseens = useSelector(selectAllUnseen);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lastJsonMessage } = useWebSocket(WS_URL + "?id=" + loggedUser?.id, {
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
    dispatch(getAllUnseen(loggedUser.token));
  }, [loggedUser]);

  useEffect(() => {
    if (lastJsonMessage) {
      dispatch(addSocketMessage(lastJsonMessage));

      if (lastJsonMessage.userId !== loggedUser.id) {
        dispatch(
          updateUnseen({
            token: loggedUser.token,
            count: 1,
            chatId: lastJsonMessage.chatId,
          }),
        );
      }
    }
  }, [lastJsonMessage, loggedUser]);

  if (!loggedUser) return null;

  return (
    <>
      <Header menu={menu} setMenu={setMenu} />
      <HomeContainer>
        <WSContext.Provider value={lastJsonMessage}>
          <Outlet />
        </WSContext.Provider>
      </HomeContainer>
      <Menu menu={menu} />
      <FooterMenu />
    </>
  );
}

export default HomePage;
