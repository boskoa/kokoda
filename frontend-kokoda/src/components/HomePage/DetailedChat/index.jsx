import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  getDetailedChat,
  selectDetailedChat,
} from "../../../features/detailedChat/detailedChatSlice";
import { useEffect } from "react";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import useWebSocket from "react-use-websocket";
import Input from "./Input";
import axios from "axios";

const WS_URL = "ws://127.0.0.1:3003/websockets";

function DetailedChat() {
  const { id } = useParams();
  const loggedUser = useSelector(selectLoggedUser);
  const chat = useSelector(selectDetailedChat);
  const dispatch = useDispatch();
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL + "?id=" + loggedUser.id,
    {
      onOpen: () => {
        console.log("WebSocket connection established.");
      },
      retryOnError: true,
      shouldReconnect: () => true,
    },
  );

  useEffect(() => {
    if (id && loggedUser) {
      dispatch(getDetailedChat({ token: loggedUser.token, id }));
    }
  }, [id, loggedUser]);

  useEffect(() => {
    console.log(lastJsonMessage);
  }, [lastJsonMessage]);

  async function sendMessage(text) {
    const config = {
      headers: {
        Authorization: `bearer ${loggedUser.token}`,
      },
    };

    await axios.post("/api/messages", { chatId: chat.id, text }, config);
  }

  if (!chat) return "loading";

  return (
    <div>
      <p>{chat.id}</p>
      <p>{chat.name}</p>
      {chat.messages.map((m) => (
        <p key={m.id}>{m.text}</p>
      ))}
      <p>{chat.body}</p>
      <p>{JSON.stringify(lastJsonMessage)}</p>
      <Input send={sendMessage} />
      <NavLink to="/chats/1">back</NavLink>
      <NavLink to="/chats/3">forth</NavLink>
    </div>
  );
}

export default DetailedChat;
