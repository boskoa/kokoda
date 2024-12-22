import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectLoggedUser } from "../../../features/login/loginSlice";

const MessageContainer = styled.div`
  background-color: #32cd3271;
  margin: 10px;
  padding: 10px;
  width: fit-content;
  border-radius: ${({ $side }) =>
    $side === "end" ? "8px 0 8px 8px" : "0 5px 5px 5px"};
  align-self: ${({ $side }) => $side};
`;

const MessageText = styled.p`
  margin-bottom: 5px;
`;

const Time = styled.span`
  font-size: 10px;
  float: right;
`;

function Message({ message }) {
  const loggedUser = useSelector(selectLoggedUser);

  return (
    <MessageContainer
      $side={loggedUser.id === message.userId ? "end" : "start"}
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
