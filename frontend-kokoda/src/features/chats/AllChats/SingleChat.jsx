import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: start;
  width: 100%;
  height: 60px;
`;

const Avatar = styled.div`
  width: 60px;
  background-color: red;
`;

const ChatData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
  flex: 2;
  background-color: black;
`;

const ChatTitle = styled.h2`
  font-size: 14px;
  border: 1px solid white;
`;

const ChatLastMessage = styled.p`
  font-size: 12px;
  border: 1px solid teal;
  text-overflow: ellipsis;
  overflow: hidden;
`;

function SingleChat({ chat }) {
  return (
    <ChatContainer>
      <Avatar />
      <ChatData>
        <ChatTitle>{chat.title.slice(0, 2)}</ChatTitle>
        <ChatLastMessage>{chat.body}</ChatLastMessage>
      </ChatData>
    </ChatContainer>
  );
}

export default SingleChat;
