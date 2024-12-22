import { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  position: sticky;
  bottom: 40px;
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
  font-size: 12px;
  scrollbar-width: none;
  resize: none;
`;

const SendButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: #ff6932;
  color: white;
  width: 50px;
  transition: all 0.2s;

  &:disabled {
    background-color: #ab674e;
  }
`;

function Input({ send, setLoaded }) {
  const [message, setMessage] = useState("");

  return (
    <InputContainer>
      <TextInput
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <SendButton
        disabled={message.trim().length < 1}
        onClick={() => {
          send(message);
          setMessage("");
          setLoaded(true);
        }}
      >
        send
      </SendButton>
    </InputContainer>
  );
}

export default Input;
