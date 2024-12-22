import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  getDetailedChat,
  selectDetailedChat,
  updateChat,
} from "../../../features/detailedChat/detailedChatSlice";
import { useEffect } from "react";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import useWebSocket from "react-use-websocket";
import Input from "./Input";
import axios from "axios";
import Message from "./Message";
import styled from "styled-components";
import { IoArrowBackCircle } from "react-icons/io5";
import { IconContext } from "react-icons";

const DetailedChatsContainer = styled.div`
  min-height: calc(100vh - 40px);
`;

const Title = styled.header`
  position: sticky;
  top: 0px;
  right: 0px;
  height: 40px;
  margin-top: -45px;
  margin-bottom: 5px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 128, 128, 0.5);
  backdrop-filter: blur(10px);
`;

const Back = styled(NavLink)`
  position: absolute;
  left: 0;
  margin-left: 10px;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const WS_URL = "ws://127.0.0.1:3003/websockets";

function DetailedChat() {
  const { id } = useParams();
  const loggedUser = useSelector(selectLoggedUser);
  const chat = useSelector(selectDetailedChat);
  const dispatch = useDispatch();
  const { lastJsonMessage } = useWebSocket(WS_URL + "?id=" + loggedUser.id, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    retryOnError: true,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    document.getElementById("vp").scrollTo({ bottom: 0, behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    if (id && loggedUser) {
      dispatch(getDetailedChat({ token: loggedUser.token, id }));
    }
  }, [id, loggedUser]);

  useEffect(() => {
    if (lastJsonMessage) {
      dispatch(updateChat(lastJsonMessage));
    }
  }, [lastJsonMessage]);

  async function sendMessage(text) {
    const config = {
      headers: {
        Authorization: `bearer ${loggedUser.token}`,
      },
    };

    await axios.post("/api/messages", { chatId: chat.id, text }, config);
  }

  if (!chat) return null;

  return (
    <DetailedChatsContainer>
      <Title>
        <IconContext.Provider value={{ color: "gold", size: "2em" }}>
          <Back to="/chats">
            <IoArrowBackCircle />
          </Back>
        </IconContext.Provider>
        {chat.name}
      </Title>
      <Messages>
        {chat.messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
      </Messages>

      <Input send={sendMessage} />
    </DetailedChatsContainer>
  );
}

export default DetailedChat;
