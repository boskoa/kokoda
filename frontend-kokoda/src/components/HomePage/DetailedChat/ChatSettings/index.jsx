import styled from "styled-components";

import { forwardRef, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateChat } from "../../../../features/chats/chatsSlice";
import { selectAllContacts } from "../../../../features/contacts/contactsSlice";
import RemoveMemberModal from "./RemoveMemberModal";

const ChatSettingsContainer = styled.div`
  height: calc(100vh - 80px);
  width: 80%;
  background-color: #00ff007d;
  margin-left: auto;
  margin-top: calc(-100vh + 80px);
  position: sticky;
  bottom: 40px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  transform: ${({ $show }) => ($show ? "translateX(0%)" : "translateX(101%)")};
  transition: all 0.4s;
  z-index: 2;
  backdrop-filter: blur(5px);
`;

const Title = styled.h3`
  text-align: center;
`;

const AdminFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ChangeField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const InputField = styled.input`
  background-color: navajowhite;
  border: none;
  padding: 2px;
  width: 160px;
`;

const SelectField = styled.select`
  background-color: navajowhite;
  border: none;
  padding: 2px;
  width: 160px;
  outline: none;
`;

const Option = styled.option``;

const ChangeButton = styled.button`
  all: unset;
  background-color: coral;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 2px;
  cursor: pointer;
`;

const MembersContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const Member = styled.button`
  border: none;
  background-color: teal;
  color: white;
  padding: 3px;
  transition: 0.1s;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

const MembersTitle = styled.h4`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
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
  const [addedMember, setAddedMember] = useState("");
  const [removeMember, setRemoveMember] = useState();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts);
  const members = contacts.filter((c) => chat?.members.includes(c.id));

  useEffect(() => {
    console.log("CHAT", chat && chat, members);
    if (chat) {
      if (chat.name) {
        setChatName(chat.name);
      } else if (!chat.group) {
        setChatName(members.find((m) => m !== loggedUser.id).name);
      }
    }
  }, [chat]);

  function handleChatName() {
    if (chatName.length > 0 && chatName.length < 21) {
      dispatch(
        updateChat({
          token: loggedUser.token,
          updateData: { name: chatName },
          id: chat.id,
        }),
      );
    }
  }

  function handleAddContact() {
    dispatch(
      updateChat({
        token: loggedUser.token,
        updateData: {
          members: [...new Set([...chat.members, parseInt(addedMember)])],
        },
        id: chat.id,
      }),
    );
  }

  function handleRemoveMember() {
    if (chat.admins.includes(loggedUser.id)) {
      dispatch(
        updateChat({
          token: loggedUser.token,
          updateData: {
            members: [
              ...new Set([...chat.members.filter((m) => m !== removeMember)]),
            ],
          },
          id: chat.id,
        }),
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

    window.location.reload();
  }

  return (
    <ChatSettingsContainer ref={ref} $show={show}>
      <Title>Customize chat</Title>
      {(loggedUser?.admin || chat.admins?.includes(loggedUser.id)) && (
        <AdminFields>
          <ChangeField>
            <InputField
              type="text"
              disabled={!chat?.group}
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
            />
            <ChangeButton disabled={!chat?.group} onClick={handleChatName}>
              Change title
            </ChangeButton>
          </ChangeField>
          <ChangeField>
            <SelectField
              value={addedMember}
              name="addContact"
              onChange={(e) => setAddedMember(e.target.value)}
            >
              <Option></Option>
              {contacts?.map((c) => (
                <Option key={c.id} value={c.id}>
                  {c.name}
                </Option>
              ))}
            </SelectField>
            <ChangeButton disabled={!addedMember} onClick={handleAddContact}>
              Add contact
            </ChangeButton>
          </ChangeField>
          <div>
            <MembersTitle>Chat members</MembersTitle>
            <MembersContainer>
              <Member>{loggedUser.name}</Member>
              {members.map((m) => (
                <Member
                  title="Remove member from chat?"
                  onClick={() => {
                    setShowModal(true);
                    setRemoveMember(m.id);
                  }}
                  key={m.id}
                >
                  {m.name}
                </Member>
              ))}
            </MembersContainer>
          </div>
          <ChangeField>
            <FieldLabel htmlFor="public">Set group to private</FieldLabel>
            <input type="checkbox" id="public" value={chat?.public} />
          </ChangeField>
        </AdminFields>
      )}
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
      {showModal && (
        <RemoveMemberModal
          setShowModal={setShowModal}
          handleRemoveMember={handleRemoveMember}
        />
      )}
    </ChatSettingsContainer>
  );
});

export default ChatSettings;
