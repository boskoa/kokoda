import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoArrowBackCircle } from "react-icons/io5";
import { IconContext } from "react-icons";
import Input from "./Input";
import Spinner from "../../Spinner";
import useIntersectionObserver from "../../../customHooks/useIntersectionObserver";
import Message from "./Message";

const DetailedChatsContainer = styled.div`
  min-height: calc(100vh - 85px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: inherit;
`;

const Title = styled.h2`
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
  font-size: 16px;
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

  & * {
    overflow-anchor: none;
  }
  ${({ $limit }) => `
    & .messages:nth-last-child(${$limit + 3}) {
      overflow-anchor: auto;
    }
  `}
`;

const Anchor = styled.p`
  overflow-anchor: auto;
  background-color: lime;
  height: 1px;
`;

function DetailedChat() {
  const { id } = useParams();
  const loggedUser = useSelector(selectLoggedUser);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const offsetRef = useRef(0);
  const limit = 10;
  const messagesRef = useRef(null);
  const loadingRef = useRef(false);
  const stopLoadingRef = useRef(false);
  const observerRef = useRef(null);
  const intersecting = useIntersectionObserver(
    observerRef,
    document.getElementById("vp"),
  );

  const getChat = useCallback(async (data) => {
    const { id, token } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.get(`/api/chats/${id}`, config);
    setChat(response.data);
  }, []);

  const getMessages = useCallback(async (data) => {
    const { token, id, offset, limit } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.get(
      `/api/messages/chat/${id}?pagination=${offset},${limit}`,
      config,
    );

    if (response.data.length !== limit) {
      stopLoadingRef.current = true;
      loadingRef.current = false;
    }

    if (!response.data.length) {
      return;
    }

    setMessages((p) =>
      p.length ? [...p, ...response.data] : [...response.data],
    );
  }, []);

  useEffect(() => {
    if (loggedUser && id) {
      getChat({ id, token: loggedUser.token });
    }
  }, [id, loggedUser]);

  useEffect(() => {
    loadingRef.current = true;
    if (intersecting && !stopLoadingRef.current) {
      getMessages({
        token: loggedUser.token,
        id,
        offset: offsetRef.current,
        limit,
      });
      offsetRef.current += limit;
    }
  }, [intersecting, getMessages]);

  useEffect(() => {
    loadingRef.current = false;
    // Set date element
    messagesRef.current.childNodes.forEach((c) => c.classList.remove("date"));

    const messageDates = Object.keys(
      Object.groupBy(messages, ({ createdAt }) =>
        new Date(createdAt).toLocaleString("en-GB").slice(0, 10),
      ),
    );

    messageDates.forEach((d) => {
      const group = document.querySelectorAll(`[data-date="${d}"]`);
      group[group.length - 1].classList.add("date");
    });
  }, [messages]);

  async function sendMessage(text) {
    const config = {
      headers: {
        Authorization: `bearer ${loggedUser.token}`,
      },
    };
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
      <Messages ref={messagesRef} $limit={limit}>
        <Anchor />
        {messages.map((m) => (
          <Message
            parentWidth={messagesRef.current?.offsetWidth}
            key={m.id}
            message={m}
          >
            {m.id}: {m.text}
          </Message>
        ))}
        <Spinner
          endRef={observerRef}
          loading={
            intersecting && loadingRef.current && !stopLoadingRef.current
          }
          style={{ marginTop: 100, overflowAnchor: "none" }}
        />
      </Messages>
      <Input send={sendMessage} />
    </DetailedChatsContainer>
  );
}

export default DetailedChat;
