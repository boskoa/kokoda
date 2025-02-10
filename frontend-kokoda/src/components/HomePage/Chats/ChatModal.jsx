import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import { selectAllContacts } from "../../../features/contacts/contactsSlice";
import { createChat, selectAllChats } from "../../../features/chats/chatsSlice";
import { useNavigate } from "react-router-dom";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(1px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const AddChatContainer = styled.div`
  background-color: #32cd3275;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 10px;
`;

const AddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Label = styled.label`
  font-size: 14px;
`;

const Button = styled.button`
  width: 80px;
  border: none;
  background-color: coral;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 3px;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

const SelectField = styled.select`
  background-color: navajowhite;
  border: none;
  padding: 2px;
  width: 160px;
  outline: none;
`;

const InputField = styled.input`
  background-color: navajowhite;
  border: none;
  padding: 2px;
  width: 160px;
`;

const Option = styled.option``;

const Contacts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Contact = styled.span`
  background-color: gold;
  color: black;
  padding: 3px;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
`;

function ChatModal({ setAddChatModal }) {
  const [chatType, setChatType] = useState("single");
  const contacts = useSelector(selectAllContacts);
  const [addedSingleContact, setAddedSingleContact] = useState(-1);
  const [addedGroupContacts, setAddedGroupContacts] = useState([]);
  const [chatName, setChatName] = useState("");
  const [publicChat, setPublicChat] = useState(false);
  const chats = useSelector(selectAllChats);
  const loggedUser = useSelector(selectLoggedUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSingleChat() {
    if (addedSingleContact !== -1) {
      const existingChat = chats.find(
        (c) =>
          c.members.includes(loggedUser.id) &&
          c.members.includes(parseInt(addedSingleContact)) &&
          c.group === false,
      );

      if (!existingChat) {
        dispatch(
          createChat({
            token: loggedUser.token,
            creationData: {
              members: [loggedUser.id, addedSingleContact],
              group: false,
            },
          }),
        );
      } else {
        navigate(`/chats/${existingChat.id}`);
      }
    }
  }

  function handleGroupChat() {
    if (addedGroupContacts.length > 0) {
      dispatch(
        createChat({
          token: loggedUser.token,
          creationData: {
            members: [loggedUser.id, ...addedGroupContacts.map((c) => c.id)],
            group: true,
            admins: [loggedUser.id],
            name: chatName,
            public: publicChat,
          },
        }),
      );
    }
  }

  return (
    <ModalContainer>
      <AddChatContainer>
        <AddContainer>
          <Label htmlFor="chatType">Select chat type</Label>
          <SelectField
            id="chatType"
            name="chatType"
            value={chatType}
            onChange={(e) => setChatType(e.target.value)}
          >
            <Option value="single">Single</Option>
            <Option value="group">Group</Option>
          </SelectField>
        </AddContainer>
        {chatType === "single" ? (
          <>
            <AddContainer>
              <Label htmlFor="AddContact">Select contact</Label>
              <SelectField
                id="AddContact"
                name="AddContact"
                value={addedSingleContact}
                onChange={(e) => setAddedSingleContact(e.target.value)}
              >
                <Option></Option>
                {contacts
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((u) => (
                    <Option value={u.id} key={u.id}>
                      {u.name}
                    </Option>
                  ))}
              </SelectField>
            </AddContainer>
          </>
        ) : (
          <>
            <AddContainer>
              <Label htmlFor="chatName">Chat name</Label>
              <InputField
                type="text"
                id="chatName"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
            </AddContainer>
            <AddContainer>
              <Label htmlFor="AddContacts">Select contact</Label>
              <SelectField
                id="AddContacts"
                name="AddContacts"
                onChange={(e) => {
                  setAddedGroupContacts((p) => [
                    ...p,
                    contacts.find((c) => c.id === parseInt(e.target.value)),
                  ]);
                }}
              >
                <Option value=""></Option>
                {contacts
                  .filter(
                    (c) => !addedGroupContacts.map((a) => a.id).includes(c.id),
                  )
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((u) => (
                    <Option value={u.id} key={u.id}>
                      {u.name}
                    </Option>
                  ))}
              </SelectField>
            </AddContainer>
            <Contacts>
              {addedGroupContacts.map((c) => (
                <Contact
                  onClick={() =>
                    setAddedGroupContacts((p) => p.filter((g) => g.id !== c.id))
                  }
                  key={c.id}
                >
                  {c.name}
                </Contact>
              ))}
            </Contacts>
            <AddContainer>
              <Label htmlFor="public">Set group to public</Label>
              <input
                type="checkbox"
                id="public"
                checked={publicChat}
                onChange={() => setPublicChat((p) => !p)}
              />
            </AddContainer>
          </>
        )}
        <AddContainer>
          <Button onClick={() => setAddChatModal(false)}>Close</Button>
          <Button
            onClick={() =>
              chatType === "single" ? handleSingleChat() : handleGroupChat()
            }
          >
            Create Chat
          </Button>
        </AddContainer>
      </AddChatContainer>
    </ModalContainer>
  );
}

export default ChatModal;
