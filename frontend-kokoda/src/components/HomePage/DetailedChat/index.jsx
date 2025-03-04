import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { IoArrowBackCircle } from "react-icons/io5";
import { IconContext } from "react-icons";
import Input from "./Input";
import Spinner from "../../Spinner";
import useIntersectionObserver from "../../../customHooks/useIntersectionObserver";
import Message from "./Message";
import WSContext from "../wsContext";
import Scroller from "./Scroller";
import {
  selectUnseenById,
  updateUnseen,
} from "../../../features/unseen/unseenSlice";
import gear from "../../../assets/gear.svg";
import ChatSettings from "./ChatSettings";
import { selectChatById } from "../../../features/chats/chatsSlice";
import { selectAllUsers } from "../../../features/users/usersSlice";

const DetailedChatsContainer = styled.div`
  min-height: calc(100vh - 35px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: inherit;
  background-image: url(${({ $backgroundUrl }) => $backgroundUrl});
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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

const ChatSettingsButton = styled.button`
  all: unset;
  position: absolute;
  right: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: rotateZ(90deg);
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
  height: 1px;
`;

function DetailedChat() {
  const { id } = useParams();
  const loggedUser = useSelector(selectLoggedUser);
  const chat = useSelector((state) => selectChatById(state, id));
  const users = useSelector(selectAllUsers);
  const [messages, setMessages] = useState([]);
  const [blocked, setBlocked] = useState(false);
  const dispatch = useDispatch();
  const limit = 20;
  const [loading, setLoading] = useState(false);
  const unseen = useSelector((state) => selectUnseenById(state, id));
  const [scrollDown, setScrollDown] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [deletedBg, setDeletedBg] = useState(false);
  const settingsRef = useRef(null);
  const offsetRef = useRef(0);
  const messagesRef = useRef(null);
  const stopLoadingRef = useRef(false);
  const observerRef = useRef(null);
  const initialRef = useRef(true);
  const intersecting = useIntersectionObserver(
    observerRef,
    document.getElementById("vp"),
  );
  const lastJsonMessage = useContext(WSContext);

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

    setLoading(false);

    if (response.data.length !== limit) {
      stopLoadingRef.current = true;
    }

    if (!response.data.length) {
      stopLoadingRef.current = true;
      return;
    }
    setMessages((p) =>
      p.length ? [...p, ...response.data] : [...response.data],
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    if (intersecting && !stopLoadingRef.current) {
      getMessages({
        token: loggedUser.token,
        id,
        offset: offsetRef.current,
        limit,
      });
      offsetRef.current += limit;
    }
  }, [intersecting, loggedUser, id, getMessages]);

  useEffect(() => {
    setLoading(false);
    // Set date element
    if (messagesRef.current) {
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
    }

    if (initialRef.current && messages.length) {
      const vp = document.getElementById("vp");
      setTimeout(() => (vp.scrollTop = vp.scrollHeight), 100);
      initialRef.current = false;
    }
  }, [messages]);

  useEffect(() => {
    let index = setTimeout(() => (initialRef.current = false), 1000);

    return () => clearTimeout(index);
  }, []);

  useEffect(() => {
    if (
      !initialRef.current &&
      lastJsonMessage &&
      lastJsonMessage.chatId == id
    ) {
      setMessages((p) => {
        if (p.length) {
          if (!p.map((m) => m.id).includes(lastJsonMessage.id)) {
            return [
              lastJsonMessage,
              ...p.filter((m) => m.id !== lastJsonMessage.id),
            ];
          } else {
            return p.map((m) =>
              m.id === lastJsonMessage.id ? lastJsonMessage : m,
            );
          }
        } else {
          return [lastJsonMessage];
        }
      });
      offsetRef.current += 1;
    }
  }, [lastJsonMessage, id, loggedUser]);

  useLayoutEffect(() => {
    const vp = document.getElementById("vp");
    let lastScrollTop = 0;
    function stopScroll(e) {
      if (e.target.scrollTop < 100) {
        e.target.scrollTop = 100;
      }

      if (
        e.target.scrollHeight - e.target.scrollTop <
        e.target.offsetHeight + 50
      ) {
        dispatch(
          updateUnseen({
            token: loggedUser.token,
            count: 0,
            chatId: id,
          }),
        );
      }

      if (
        e.target.scrollHeight - e.target.scrollTop >
        e.target.offsetHeight + 500
      ) {
        if (
          e.target.scrollTop - lastScrollTop > 10 &&
          e.target.scrollTop - lastScrollTop < 500
        ) {
          setScrollDown(true);
        } else if (e.target.scrollTop < lastScrollTop) {
          setScrollDown(false);
        }
      } else {
        setScrollDown(false);
      }
      lastScrollTop = e.target.scrollTop;
    }
    vp.addEventListener("scroll", stopScroll);

    return () => {
      vp.removeEventListener("scroll", stopScroll);
    };
  }, []);

  if (
    !chat ||
    !users ||
    users.find(
      (u) => u.id === chat.members.find((m) => m !== loggedUser.id),
    ) === undefined
  ) {
    return (
      <Spinner
        endRef={observerRef}
        loading={intersecting && loading && !stopLoadingRef.current}
      />
    );
  }

  async function sendMessage(text) {
    const config = {
      headers: {
        Authorization: `bearer ${loggedUser.token}`,
      },
    };
    try {
      await axios.post("/api/messages", { chatId: chat.id, text }, config);
    } catch (error) {
      if (error.response.data.error === "You are blocked by this user") {
        setBlocked(true);
      }
    }
  }

  return (
    <DetailedChatsContainer
      $backgroundUrl={
        !deletedBg
          ? `/public/uploads/backgrounds/${loggedUser?.id}-${chat?.id}.webp`
          : ""
      }
    >
      <Title>
        <IconContext.Provider value={{ color: "gold", size: "2em" }}>
          <Back to="/chats" title="Go back">
            <IoArrowBackCircle />
          </Back>
        </IconContext.Provider>
        {chat.name ||
          users.find(
            (u) => u.id === chat.members.find((m) => m !== loggedUser.id),
          ).name}
        <ChatSettingsButton onClick={() => setShowSettings((p) => !p)}>
          <img
            src={gear}
            title="Chat settings"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(91%) sepia(17%) saturate(4935%) hue-rotate(357deg) brightness(99%) contrast(105%)",
            }}
          />
        </ChatSettingsButton>
      </Title>
      <Messages ref={messagesRef} $limit={limit}>
        <Anchor />
        {messages.map((m) => (
          <Message
            parentWidth={messagesRef.current?.offsetWidth}
            key={m.id}
            message={m}
            setMessages={setMessages}
          >
            {m.id}: {m.text}
          </Message>
        ))}
        <Spinner
          endRef={observerRef}
          loading={intersecting && loading && !stopLoadingRef.current}
          style={{ marginBottom: 100 }}
        />
      </Messages>
      <Input send={sendMessage} blocked={blocked} />
      <Scroller unseen={unseen?.count} scrollDown={scrollDown} />
      <ChatSettings
        ref={settingsRef}
        show={showSettings}
        chat={chat}
        loggedUser={loggedUser}
        setDeletedBg={setDeletedBg}
      />
    </DetailedChatsContainer>
  );
}

export default DetailedChat;
