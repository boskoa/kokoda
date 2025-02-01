import styled from "styled-components";
import user from "/user.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUnseenById,
  updateUnseen,
} from "../../../features/unseen/unseenSlice";
import NewMessages from "./NewMessages";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import { selectContactById } from "../../../features/contacts/contactsSlice";
import { selectUserById } from "../../../features/users/usersSlice";

const ChatContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: start;
  gap: 10px;
  width: 100%;
  height: 60px;
  position: relative;
  cursor: pointer;
`;

const Avatar = styled.div`
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  box-shadow: 0 0 5px 0 rgba(125, 235, 155, 1);
`;

const UserIcon = styled.img`
  width: 60px;
  height: 60px;
  opacity: 0;
  object-fit: contain;
  object-position: center;
  border-radius: 50%;
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
  padding-top: 5px;
`;

const ChatLastMessage = styled.p`
  font-size: 12px;
  height: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

function SingleChat({ chat }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector(selectLoggedUser);
  const count = useSelector((state) => selectUnseenById(state, chat.id))?.count;
  const group = chat.members.length > 2;
  const directory = group ? "chat" : "avatars";
  const contactId = group ? -1 : chat.members.find((m) => m !== loggedUser.id);
  const contact = useSelector((state) => selectUserById(state, contactId));
  const imageId = group
    ? chat.id
    : chat.members.find((m) => m !== loggedUser.id);

  function handleClick() {
    dispatch(
      updateUnseen({
        token: loggedUser.token,
        count: 0,
        chatId: chat.id,
      }),
    );

    setTimeout(() => navigate(`/chats/${chat.id}`), 100);
  }

  return (
    <ChatContainer onClick={handleClick}>
      <Avatar>
        <UserIcon
          // Remove image extension after upload implementation
          src={`/public/uploads/${directory}/${imageId}.webp`}
          alt="user avatar"
          onLoad={(e) => {
            e.currentTarget.style.opacity = 1;
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = user;
            e.currentTarget.style.opacity = 1;
          }}
        />
      </Avatar>
      <ChatData>
        <ChatTitle>{chat.name || contact?.name}</ChatTitle>
        <ChatLastMessage>
          {(chat.messages?.length && chat.messages[0].text) ||
            "No messages yet."}
        </ChatLastMessage>
        <NewMessages count={count || 0} />
      </ChatData>
      <ChatBackground />
    </ChatContainer>
  );
}

export default SingleChat;
