import styled from "styled-components";

const NewMessagesContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 20px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
`;

function NewMessages({ count }) {
  if (!count) return null;

  return <NewMessagesContainer>{count}</NewMessagesContainer>;
}

export default NewMessages;
