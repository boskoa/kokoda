import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import FooterMenu from "./FooterMenu";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../../features/login/loginSlice";
import Header from "./Header";
import useWebSocket from "react-use-websocket";
import WSContext from "./wsContext";
import {
  addSocketMessage,
  getAllChats,
  selectAllChats,
} from "../../features/chats/chatsSlice";
import { getAllUnseen, updateUnseen } from "../../features/unseen/unseenSlice";
import { getAllContacts } from "../../features/contacts/contactsSlice";
import { getAllUsers } from "../../features/users/usersSlice";

const HomeContainer = styled.div`
  background-color: transparent;
  color: ${({ theme }) => theme.main.fg};
  min-height: calc(100% - 45px);
  width: inherit;
  position: relative;
  padding-bottom: 40px;
  z-index: 1;
`;

const WS_URL = `wss://${window.location.host}/websockets`;

function HomePage() {
  const [menu, setMenu] = useState(false);
  const loggedUser = useSelector(selectLoggedUser);
  const chats = useSelector(selectAllChats);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const headerRef = useRef(null);

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
    } else {
      dispatch(getAllUnseen(loggedUser.token));
      dispatch(getAllContacts({ token: loggedUser.token }));
      dispatch(getAllChats({ token: loggedUser.token }));
    }
  }, [loggedUser]);

  useEffect(() => {
    if (chats.length && loggedUser) {
      const users = [...new Set(chats.map((c) => c.members).flat())];
      dispatch(getAllUsers({ token: loggedUser.token, query: users }));
    }
  }, [loggedUser, chats]);

  useEffect(() => {
    let edit = false;
    if (chats.length && lastJsonMessage) {
      edit =
        chats.find((c) => c.id === lastJsonMessage.chatId).messages[0]?.id >=
        lastJsonMessage.id;
    }

    if (lastJsonMessage && !edit) {
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

    if (
      lastJsonMessage &&
      edit &&
      lastJsonMessage.id ===
        chats.find((c) => c.id === lastJsonMessage.chatId).messages[0]?.id
    ) {
      dispatch(addSocketMessage(lastJsonMessage));
    }
  }, [lastJsonMessage, loggedUser, chats.length]);

  useEffect(() => {
    function handleMenuClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !headerRef.current.contains(e.target)
      ) {
        setMenu(false);
      }
    }

    document.addEventListener("click", handleMenuClick);

    return () => document.removeEventListener("click", handleMenuClick);
  }, []);

  if (!loggedUser) return null;

  return (
    <>
      <Header setMenu={setMenu} ref={headerRef} />
      <HomeContainer>
        <WSContext.Provider value={lastJsonMessage}>
          <Outlet />
        </WSContext.Provider>
      </HomeContainer>
      <Menu menu={menu} setMenu={setMenu} ref={menuRef} />
      <FooterMenu />
    </>
  );
}

export default HomePage;
