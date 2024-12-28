import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import useWebSocket from "react-use-websocket";
import Input from "./Input";
import axios from "axios";
import Message from "./Message";
import styled from "styled-components";
import { IoArrowBackCircle } from "react-icons/io5";
import { IconContext } from "react-icons";
import useIntersectionObserver from "../../../customHooks/useIntersectionObserver";
import Spinner from "../../Spinner";

const DetailedChatsContainer = styled.div`
  min-height: calc(100vh - 85px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: inherit;
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
  background-color: rgba(0, 128, 128, 0.7);
  backdrop-filter: blur(20px);
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
  flex: 2;
  display: flex;
  flex-direction: column-reverse;
  justify-content: end;
  padding-bottom: 10px;
`;

const WS_URL = "ws://127.0.0.1:3003/websockets";

function DetailedChat() {
  const { id } = useParams();
  const loggedUser = useSelector(selectLoggedUser);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  //implement condition for fetching more messages
  const [prevLength, setPrevLength] = useState(-10);
  const stopLoading = prevLength === messages.length;
  const [lastHeight, setLastHeight] = useState();
  const [loading, setLoading] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(true);
  const endRef = useRef(null);
  const intersecting = useIntersectionObserver(endRef);
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const { lastJsonMessage } = useWebSocket(WS_URL + "?id=" + loggedUser.id, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    retryOnError: true,
    shouldReconnect: () => true,
  });
  //fix dependencies
  useLayoutEffect(() => {
    const vp = document.getElementById("vp");
    shouldScroll
      ? vp.scrollTo({
          top: vp.scrollHeight,
          behavior: messages.length <= 10 ? "instant" : "smooth",
        })
      : (vp.scrollTop = vp.scrollHeight - lastHeight);

    setLastHeight(vp.scrollHeight);
    setLoading(false);
  }, [messages]);

  useEffect(() => {
    async function getChat(data) {
      const { id, token } = data;
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const response = await axios.get(`/api/chats/${id}`, config);
      setChat(response.data);
    }
    if (loggedUser) {
      getChat({ id, token: loggedUser.token });
    }
  }, [loggedUser, id]);
  //fix dependencies
  useEffect(() => {
    async function getMessages(data) {
      const { token, id, offset, limit } = data;
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      if (messages.length >= 10) setShouldScroll(false);
      setLoading(true);
      const response = await axios.get(
        `/api/messages/chat/${id}?pagination=${offset},${limit}`,
        config,
      );

      setMessages((p) =>
        p.length ? [...p, ...response.data] : [...response.data],
      );
    }

    if (intersecting && !stopLoading && !loading) {
      getMessages({ token: loggedUser.token, id, offset, limit });
      setOffset((p) => p + limit);
      setPrevLength(messages.length);
    }
  }, [intersecting, messages]);

  useEffect(() => {
    // set no scroll if it's not our message
    if (lastJsonMessage) {
      setMessages((p) =>
        p.length ? [lastJsonMessage, ...p] : [lastJsonMessage],
      );
      setOffset((p) => p + 1);
    }
  }, [lastJsonMessage]);

  async function sendMessage(text) {
    const config = {
      headers: {
        Authorization: `bearer ${loggedUser.token}`,
      },
    };
    setShouldScroll(true);
    await axios.post("/api/messages", { chatId: chat.id, text }, config);
  }

  return (
    <DetailedChatsContainer>
      <Title>
        <IconContext.Provider value={{ color: "gold", size: "2em" }}>
          <Back to="/chats">
            <IoArrowBackCircle />
          </Back>
        </IconContext.Provider>
        {chat?.name}
      </Title>
      <Spinner endRef={endRef} loading={loading} />
      <Messages>
        {messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
      </Messages>

      <Input send={sendMessage} />
    </DetailedChatsContainer>
  );
}

export default DetailedChat;
