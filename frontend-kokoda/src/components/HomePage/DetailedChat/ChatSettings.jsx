import styled from "styled-components";

import { forwardRef, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateChat } from "../../../features/chats/chatsSlice";
import { selectAllContacts } from "../../../features/contacts/contactsSlice";

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
  gap: 30px;
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
  cursor: pointer;
`;

const FieldLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
`;

const BackgroundField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
`;

const Image = styled.img`
  height: 220px;
  width: 220px;
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

const SetButton = styled.div`
  background-color: coral;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 2px;
  cursor: pointer;
`;

const ChatSettings = forwardRef(function ChatSettings(
  { show, chat, loggedUser },
  ref,
) {
  const [name, setName] = useState("Choose background");
  const [file, setFile] = useState(null);
  const [chatName, setChatName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts);
  const members = contacts.filter((c) => chat?.members.includes(c.id));

  useEffect(() => {
    console.log("CHAT", chat && chat, name, file);
    if (chat) {
      if (chat.name) {
        setChatName(chat.name);
      } else if (!chat.group) {
        setChatName(members.find((m) => m !== loggedUser.id).name);
      }
    }
  }, [chat]);

  function handleChatName() {
    if (chatName.length > 0 && chatName.length < 21 && chat.group) {
      dispatch(
        updateChat({ token: loggedUser.token, data: { name: chatName } }),
      );
    }
  }

  async function handleImageSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    await axios.post(`/api/backgrounds/${name}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `bearer ${loggedUser.token}`,
      },
    });

    //window.location.reload();
  }

  return (
    <ChatSettingsContainer ref={ref} $show={show}>
      <Title>Customize chat</Title>
      <ChangeField>
        <FieldInput
          type="text"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
        />
        <ChangeButton>Change title</ChangeButton>
      </ChangeField>
      <ChangeField>
        <FieldInput type="text" value="foo" />
        <ChangeButton>Add contact</ChangeButton>
      </ChangeField>
      <ChangeField>
        <FieldLabel htmlFor="public">Set group to private</FieldLabel>
        <input type="checkbox" id="public" value={chat?.public} />
      </ChangeField>
      <BackgroundField>
        <Form id="background-form" encType="multipart/form-data">
          <label htmlFor="background" style={{ maxWidth: "70%" }}>
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
            <SetButton type="button">Choose image</SetButton>
          </label>
          <ChangeButton
            type="submit"
            disabled={!file}
            onClick={(e) => handleImageSubmit(e)}
          >
            Set
          </ChangeButton>
        </Form>
        {file && (
          <Image
            alt="chosen background"
            src={
              file
                ? URL.createObjectURL(file)
                : `/public/uploads/backgrounds/${loggedUser?.id}-${chat?.id}.webp`
            }
          />
        )}
      </BackgroundField>
    </ChatSettingsContainer>
  );
});

export default ChatSettings;
