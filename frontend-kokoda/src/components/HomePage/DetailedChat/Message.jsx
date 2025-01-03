import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectLoggedUser } from "../../../features/login/loginSlice";

const MessageContainer = styled.div`
  position: relative;
  background-color: #32cd3271;
  margin: 10px;
  padding: 10px;
  width: fit-content;
  max-width: 80%;
  word-wrap: break-word;
  border-radius: ${({ $side }) =>
    $side === "end" ? "8px 0 8px 8px" : "0 5px 5px 5px"};
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
    right: ${({ $side }) => ($side === "end" ? 0 : "")};
    left: ${({ $side }) => ($side === "start" ? 0 : "")};
    height: 12px;
    font-size: 12px;
    line-height: 100%;
    width: ${({ $width }) => $width};
    filter: brightness(0.8);
  }
`;

const MessageText = styled.p`
  margin-bottom: 5px;
`;

const Time = styled.span`
  font-size: 10px;
  float: right;
  filter: brightness(0.8);
`;

function Message({ message, parentWidth }) {
  const loggedUser = useSelector(selectLoggedUser);

  return (
    <MessageContainer
      className="messages"
      $side={loggedUser.id === message.userId ? "end" : "start"}
      data-date={new Date(message.createdAt)
        .toLocaleString("en-GB")
        .slice(0, 10)}
      $width={`${parentWidth - 20}px`}
    >
      <MessageText>{message.text}</MessageText>
      <Time>
        {new Date(message.updatedAt).toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Time>
    </MessageContainer>
  );
}

export default Message;
