import { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  position: fixed;
  bottom: 0px;
  width: inherit;
  display: flex;
  align-items: stretch;
  height: 40px;
`;

const TextInput = styled.textarea`
  flex: 2;
  outline: none;
  border: 1px solid #ff6932;
  background-color: #ff6932ca;
  color: white;
  font-size: 16px;
  scrollbar-width: none;
  resize: none;
  display: flex;
  padding: 10px 5px;
`;

const SendButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: #ff6932;
  color: white;
  width: 50px;
  font-size: 16px;
  transition: all 0.2s;

  &:disabled {
    background-color: #ab674e;
  }
`;

function Input({ send, blocked }) {
  const [message, setMessage] = useState("");

  return (
    <InputContainer>
      <TextInput
        id="messageInput"
        type="text"
        value={blocked ? "You are blocked by this user" : message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <SendButton
        disabled={message.trim().length < 1 || blocked}
        onClick={() => {
          send(message);
          setMessage("");
        }}
      >
        send
      </SendButton>
    </InputContainer>
  );
}

export default Input;
