import styled from "styled-components";
import user from "/user.svg";

const ChatContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: start;
  gap: 5px;
  width: 100%;
  height: 60px;
  position: relative;
`;

const Avatar = styled.div`
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  border: 2px solid rgba(125, 235, 155, 0.5);
`;

const UserIcon = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 50%;
  opacity: 0;
  transition: all 1s;
`;

const ChatData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
  gap: 5px;
  width: calc(100% - 60px - 5px);
  position: relative;
`;

const ChatBackground = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(100, 100, 100, 0.2),
    rgba(100, 100, 100, 0.2) 20%,
    transparent
  );
  border-radius: 30px;
  z-index: -1;
`;

const ChatTitle = styled.h2`
  font-size: 14px;
  height: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ChatLastMessage = styled.p`
  font-size: 12px;
  height: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

function SingleChat({ chat }) {
  return (
    <ChatContainer>
      <Avatar>
        <UserIcon
          src={`/public/uploads/avatars/${chat.id}.webp`}
          alt="user avatar"
          onLoad={(e) => {
            e.currentTarget.opacity = 1;
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = user;
            e.currentTarget.style.opacity = 1;
          }}
          height="100%"
          width="100%"
        />
      </Avatar>
      <ChatData>
        <ChatTitle>{chat.name}</ChatTitle>
        <ChatLastMessage>
          {chat.messages[0]?.text || "No messages yet."}
        </ChatLastMessage>
      </ChatData>
      <ChatBackground />
    </ChatContainer>
  );
}

export default SingleChat;
