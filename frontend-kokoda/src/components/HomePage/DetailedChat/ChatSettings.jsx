import styled from "styled-components";

import { forwardRef, useEffect, useState } from "react";
import axios from "axios";

const ChatSettingsContainer = styled.div`
  height: calc(100vh - 80px);
  width: 80%;
  background-color: #00ff007d;
  margin-left: auto;
  margin-top: calc(-100vh + 80px);
  position: sticky;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 5px;
  transform: ${({ $show }) => ($show ? "translateX(0%)" : "translateX(101%)")};
  transition: all 0.4s;
  z-index: 2;
  backdrop-filter: blur(5px);
`;

const Title = styled.h3`
  margin-bottom: 20px;
  text-align: center;
`;

const ChangeField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const FieldInput = styled.input`
  background-color: navajowhite;
  border: none;
  padding: 2px;
  width: 160px;
`;

const ChangeButton = styled.button`
  all: unset;
  background-color: coral;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 2px;
`;

const FieldLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  display: block;
  object-fit: cover;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 5px;
  width: 100%;
`;

const ChatSettings = forwardRef(function ChatSettings(
  { show, chat, loggedUser },
  ref,
) {
  const [name, setName] = useState("Choose background");
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log("CHAT", chat && chat, name, file);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    await axios.post(
      "/api/backgrounds/chats",
      { formData, userId: loggedUser.id, chatId: chat.id },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${loggedUser.token}`,
        },
      },
    );

    window.location.reload();
  }

  return (
    <ChatSettingsContainer ref={ref} $show={show}>
      <Title>Customize chat</Title>
      <ChangeField>
        <FieldInput type="text" value={chat?.name} />
        <ChangeButton>Change title</ChangeButton>
      </ChangeField>
      <ChangeField>
        <FieldLabel for="public">Set group to private</FieldLabel>
        <input type="checkbox" id="public" value={chat?.public} />
      </ChangeField>
      <ChangeField>
        <FieldInput type="text" value="foo" />
        <ChangeButton>Add contact</ChangeButton>
      </ChangeField>
      <ChangeField>
        <Image
          alt="chosen background"
          src={
            file
              ? URL.createObjectURL(file)
              : `/public/uploads/backgrounds/chats/${loggedUser?.id}-${chat?.id}.webp`
          }
          onError={(e) => {
            e.currentTarget.src = "/public/uploads/avatars/1.png";
            e.currentTarget.height = "28";
            e.currentTarget.width = "28";
          }}
        />
        <Form id="background-form" encType="multipart/form-data">
          <label htmlFor="background">
            <input
              style={{
                display: "none",
              }}
              id="background"
              type="file"
              name="background"
              onChange={(e) => {
                setName(`${loggedUser.id}-${chat.id}`);
                setFile(e.target.files[0]);
              }}
            />
            <ChangeButton type="button">Choose image</ChangeButton>
          </label>
          <ChangeButton
            type="submit"
            disabled={!file}
            onClick={(e) => handleSubmit(e)}
          >
            Set
          </ChangeButton>
        </Form>
      </ChangeField>
    </ChatSettingsContainer>
  );
});

export default ChatSettings;
