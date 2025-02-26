import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import user from "/user.svg";
import { useState } from "react";
import MessageEdit from "./MessageEdit";
import edit from "../../../assets/edit.svg";
import { useNavigate } from "react-router-dom";

const MessageContainer = styled.div`
  position: relative;
  background-color: #005c5cdf;
  margin: 10px;
  padding: 10px;
  width: fit-content;
  min-width: 100px;
  max-width: 80%;
  word-wrap: break-word;
  margin-left: ${({ $side }) => ($side === "end" ? "0px" : "30px")};
  border-radius: ${({ $side }) =>
    $side === "end" ? "10px 0 10px 10px" : "0 10px 10px 10px"};
  align-self: ${({ $side }) => $side};

  &.date {
    margin-top: 30px;
  }

  &.date::before {
    content: attr(data-date);
    position: absolute;
    top: -27px;
    border-radius: 5px;
    box-shadow: 0px -2px 2px -1px gold;
    text-align: center;
    right: ${({ $side }) => ($side === "end" ? "0px" : "")};
    left: ${({ $side }) => ($side === "start" ? "-20px" : "")};
    height: 12px;
    font-size: 12px;
    line-height: 100%;
    width: ${({ $width }) => $width};
    filter: brightness(0.8);
  }
`;

const MiniAvatar = styled.img`
  position: absolute;
  top: 0;
  left: -27px;
  border-radius: 50%;
  height: 22px;
  width: 22px;
  background-color: gold;
  border: 2px solid gold;
  opacity: 0;
  object-fit: contain;
  transition: all 1s;
  cursor: pointer;
`;

const MessageText = styled.p`
  margin: 5px 10px 5px 0;
`;

const Time = styled.span`
  margin-top: 5px;
  font-size: 10px;
  float: right;
  filter: brightness(0.8);

  ${({ $edited }) =>
    $edited &&
    `&::before {
    content: "edited";
    position: absolute;
    left: -130%;
    font-style: italic;
  }`}
`;

const EditButton = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  top: 5px;
  right: 5px;
  transition: all 0.1s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`;

function Message({ message, parentWidth, setMessages }) {
  const loggedUser = useSelector(selectLoggedUser);
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  return (
    <MessageContainer
      className="messages"
      $side={loggedUser.id === message.userId ? "end" : "start"}
      data-date={new Date(message.createdAt)
        .toLocaleString("en-GB")
        .slice(0, 10)}
      $width={`${parentWidth - 20}px`}
    >
      {loggedUser.id !== message.userId && (
        <MiniAvatar
          onClick={() => navigate(`/contacts/${message.userId}`)}
          src={`/public/uploads/avatars/${message.userId}.webp`}
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
      )}
      {!showEdit ? (
        <MessageText>
          {message.userId === loggedUser.id && (
            <EditButton>
              <img
                src={edit}
                title="Edit"
                onClick={() => setShowEdit(true)}
                style={{
                  width: "12px",
                  height: "12px",
                  filter:
                    "brightness(0) saturate(100%) invert(91%) sepia(17%) saturate(4935%) hue-rotate(357deg) brightness(99%) contrast(105%)",
                }}
              />
            </EditButton>
          )}
          {message.text}
        </MessageText>
      ) : (
        <MessageEdit
          message={message}
          loggedUser={loggedUser}
          setShowEdit={setShowEdit}
          setMessages={setMessages}
        />
      )}
      <Time $edited={message.updatedAt !== message.createdAt}>
        {new Date(message.createdAt).toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Time>
    </MessageContainer>
  );
}

export default Message;
