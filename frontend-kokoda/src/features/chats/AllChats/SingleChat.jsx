import styled from "styled-components";
import user from "/user.svg";
import { useLayoutEffect, useRef, useState } from "react";
import trimText from "../../../utils/trimText";

const ChatContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: start;
  gap: 5px;
  width: 100%;
  height: 60px;
`;

const Avatar = styled.div`
  width: 60px;
  //background: linear-gradient(90deg, rgba(0, 0, 0, 0.5) 30%, transparent);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid rgba(125, 235, 155, 0.5);
`;

const UserIcon = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 50%;
`;

const ChatData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
  flex: 2;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      transparent 80%,
      rgba(0, 0, 0, 0.5) 90%,
      black
    );
  }
`;

const ChatTitle = styled.h2`
  font-size: 14px;
  overflow: hidden;
  flex: 1;
`;

const ChatLastMessage = styled.p`
  font-size: 12px;
  flex: 2;
  overflow: hidden;
`;

function SingleChat({ chat }) {
  const titleRef = useRef();
  const messageRef = useRef();
  const [title, setTitle] = useState(chat.title);
  const [message, setMessage] = useState(chat.body);

  useLayoutEffect(() => {
    trimText(titleRef.current, chat.title, setTitle);
    trimText(messageRef.current, chat.body, setMessage, 2);
  }, []);

  return (
    <ChatContainer>
      <Avatar>
        <UserIcon
          src={`/public/uploads/avatars/${chat.id}.webp`}
          alt="user avatar"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = user;
          }}
          height="100%"
          width="100%"
        />
      </Avatar>
      <ChatData>
        <ChatTitle ref={titleRef}>{title.split().toString()}</ChatTitle>
        <ChatLastMessage ref={messageRef}>{message}</ChatLastMessage>
      </ChatData>
    </ChatContainer>
  );
}

export default SingleChat;
