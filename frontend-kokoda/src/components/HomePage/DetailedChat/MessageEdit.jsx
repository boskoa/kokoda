import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const EditInput = styled.textarea`
  margin-bottom: 5px;
  min-width: 240px;
  height: 58px;
  display: block;
  outline: none;
  background-color: transparent;
  color: inherit;
  border: 1px solid gold;
  scrollbar-width: none;
  resize: none;
  font-size: 14px;
  padding: 4px;
`;

const Button = styled.button`
  border: none;
  border-radius: 3px;
  background-color: gold;
  padding: 2px;
  width: 50px;
  cursor: pointer;
  transition: all 0.1s;

  &:active {
    transform: scale(0.95);
  }
`;

function MessageEdit({ message, loggedUser, setShowEdit, setMessages }) {
  const [edit, setEdit] = useState("");

  useEffect(() => {
    setEdit(message.text);
  }, []);

  async function handleEdit() {
    if (edit !== message.text) {
      const config = {
        headers: {
          Authorization: `bearer ${loggedUser.token}`,
        },
      };
      try {
        const response = await axios.patch(
          `/api/messages/${message.id}`,
          { text: edit },
          config,
        );
        console.log("RESP", response.data);
        setMessages((p) =>
          p.map((x) => (response.data.id === x.id ? response.data : x)),
        );
      } catch (error) {
        console.log("Error:", error);
      }
    }

    setShowEdit(false);
  }

  return (
    <>
      <EditInput
        type="text"
        value={edit}
        onChange={(e) => setEdit(e.target.value)}
      />
      <Button onClick={handleEdit}>Edit</Button>
      <Button style={{ marginLeft: 10 }} onClick={() => setShowEdit(false)}>
        Cancel
      </Button>
    </>
  );
}

export default MessageEdit;
