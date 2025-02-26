import styled from "styled-components";
import { forwardRef, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  removeGroupChat,
  updateChat,
} from "../../../../features/chats/chatsSlice";
import { selectAllContacts } from "../../../../features/contacts/contactsSlice";
import RemoveMemberModal from "./RemoveMemberModal";
import RemoveAdminModal from "./RemoveAdminModal";
import { selectAllUsers } from "../../../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

const ChatSettingsContainer = styled.div`
  height: calc(100vh - 80px);
  width: 80%;
  background-color: #0080804e;
  margin-left: auto;
  margin-top: calc(-100vh + 80px);
  position: sticky;
  bottom: 40px;
  padding: 5px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transform: ${({ $show }) => ($show ? "translateX(0%)" : "translateX(101%)")};
  transition: all 0.4s;
  z-index: 2;
  backdrop-filter: blur(5px);
  overflow: auto;
`;

const Title = styled.h3`
  text-align: center;
`;

const AdminFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  width: 60%;
`;

const SelectField = styled.select`
  background-color: navajowhite;
  border: none;
  padding: 2px;
  width: 60%;
  outline: none;
`;

const Option = styled.option``;

const ChangeButton = styled.button`
  all: unset;
  background-color: coral;
  flex: 2;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 0;
  cursor: pointer;
  text-align: center;
  transition: 0.1s;

  &:hover {
    color: black;
  }
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
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  height: 70px;
`;

const Image = styled.img`
  height: 100%;
  display: block;
  object-fit: cover;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
  align-self: flex-start;
  gap: 5px;
  width: 40%;
  height: 100%;
  transition: all 0.2s;
`;

const SetButton = styled.div`
  background-color: coral;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 0;
  cursor: pointer;
  text-align: center;
  transition: 0.1s;

  &:hover {
    color: black;
  }
`;

const ChatSettings = forwardRef(function ChatSettings(
  { show, chat, loggedUser, setDeletedBg },
  ref,
) {
  const [bgName, setBgName] = useState("Choose background");
  const [bgFile, setBgFile] = useState(null);
  const [avatarName, setAvatarName] = useState("Choose background");
  const [avatarFile, setAvatarFile] = useState(null);
  const [chatName, setChatName] = useState("");
  const [addedMember, setAddedMember] = useState("");
  const [removeMember, setRemoveMember] = useState();
  const [addedAdmin, setAddedAdmin] = useState("");
  const [removeAdmin, setRemoveAdmin] = useState();
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts);
  const users = useSelector(selectAllUsers);
  const members = users.filter((u) => chat?.members.includes(u.id));
  const adminConditions =
    (loggedUser?.admin || chat.admins?.includes(loggedUser.id)) && chat.group;
  const navigate = useNavigate();

  useEffect(() => {
    if (chat) {
      if (chat.name) {
        setChatName(chat.name);
      } else if (!chat.group) {
        setChatName(members.find((m) => m !== loggedUser.id).name);
      }
    }
  }, [chat]);

  function handleChatName() {
    if (adminConditions) {
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
  }

  function handleAddContact() {
    if (adminConditions) {
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
  }

  function handleRemoveMember() {
    if (adminConditions) {
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

  function handleMakePrivate() {
    if (adminConditions) {
      dispatch(
        updateChat({
          token: loggedUser.token,
          updateData: {
            public: !chat.public,
          },
          id: chat.id,
        }),
      );
    }
  }

  function handleAddAdmin() {
    if (adminConditions) {
      dispatch(
        updateChat({
          token: loggedUser.token,
          updateData: {
            admins: [...new Set([...chat.admins, parseInt(addedAdmin)])],
          },
          id: chat.id,
        }),
      );
    }
  }

  function handleRemoveAdmin() {
    if (adminConditions && chat.admins.length > 1) {
      dispatch(
        updateChat({
          token: loggedUser.token,
          updateData: {
            admins: [
              ...new Set([...chat.admins.filter((m) => m !== removeAdmin)]),
            ],
          },
          id: chat.id,
        }),
      );
    }
  }

  async function handleBgImageSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", bgName);
    formData.append("file", bgFile);

    try {
      await axios.post(`/api/backgrounds/${bgName}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${loggedUser.token}`,
        },
      });

      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function handleRemoveBgImage() {
    try {
      const response = await axios.delete(
        `/api/backgrounds/${loggedUser.id}-${chat.id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `bearer ${loggedUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        setDeletedBg(true);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function handleAvatarImageSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", avatarName);
    formData.append("file", avatarFile);

    try {
      await axios.post(`/api/chatAvatars/${avatarName}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${loggedUser.token}`,
        },
      });
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function handleRemoveAvatarImage() {
    try {
      const response = await axios.delete(`/api/chatAvatars/${chat.id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${loggedUser.token}`,
        },
      });
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function handleLeaveChat() {
    const config = {
      headers: {
        Authorization: `bearer ${loggedUser.token}`,
      },
    };

    const updateData = {
      members: chat.members.filter((m) => m !== loggedUser.id),
    };
    if (chat.admins.includes(loggedUser.id)) {
      updateData.admins = chat.admins.filter((a) => a !== loggedUser.id);
    }

    await axios.patch(`/api/chats/${chat.id}`, updateData, config);
    dispatch(removeGroupChat(chat.id));
    navigate("/chats");
  }

  return (
    <ChatSettingsContainer ref={ref} $show={show}>
      <Title>Customize chat</Title>
      {adminConditions && (
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
              <Option key={0}></Option>
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
          <ChangeField>
            <SelectField
              value={addedAdmin}
              name="addAdmin"
              onChange={(e) => setAddedAdmin(e.target.value)}
            >
              <Option></Option>
              {members?.map((c) => (
                <Option key={c.id} value={c.id}>
                  {c.name}
                </Option>
              ))}
            </SelectField>
            <ChangeButton disabled={!addedAdmin} onClick={handleAddAdmin}>
              Add admin
            </ChangeButton>
          </ChangeField>
          <div>
            <MembersTitle>Chat members</MembersTitle>
            <MembersContainer>
              {members.map((m) => (
                <Member
                  title="Remove member from chat?"
                  onClick={() => {
                    setShowMemberModal(true);
                    setRemoveMember(m.id);
                  }}
                  key={m.id}
                >
                  {m.name}
                </Member>
              ))}
            </MembersContainer>
          </div>
          <div>
            <MembersTitle>Chat admins</MembersTitle>
            <MembersContainer>
              {members
                .filter((m) => chat.admins.includes(m.id))
                .map((m) => (
                  <Member
                    title="Remove admin privileges?"
                    onClick={() => {
                      setShowAdminModal(true);
                      setRemoveAdmin(m.id);
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
            <input
              type="checkbox"
              id="public"
              checked={!chat?.public}
              onChange={handleMakePrivate}
            />
          </ChangeField>
        </AdminFields>
      )}
      {chat.group && (
        <ChangeButton style={{ flex: 0 }} onClick={handleLeaveChat}>
          Leave chat
        </ChangeButton>
      )}
      <ChangeButton
        onClick={handleRemoveBgImage}
        style={{ textAlign: "center", marginBottom: -10, flex: 0 }}
      >
        Remove current background
      </ChangeButton>
      <BackgroundField>
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
                setBgName(`${loggedUser.id}-${chat.id}`);
                setBgFile(e.target.files[0]);
              }}
            />
            <SetButton type="button">Choose image</SetButton>
          </label>
          <ChangeButton
            type="submit"
            disabled={!bgFile}
            style={{ flex: 0 }}
            onClick={(e) => handleBgImageSubmit(e)}
          >
            Set image
          </ChangeButton>
        </Form>
        {bgFile && (
          <Image
            alt="chosen background"
            src={
              bgFile
                ? URL.createObjectURL(bgFile)
                : `/public/uploads/backgrounds/${loggedUser?.id}-${chat?.id}.webp`
            }
          />
        )}
      </BackgroundField>
      <ChangeButton
        onClick={handleRemoveAvatarImage}
        style={{ textAlign: "center", marginBottom: -10, flex: 0 }}
      >
        Remove current avatar
      </ChangeButton>
      <BackgroundField>
        <Form id="chat-avatar-form" encType="multipart/form-data">
          <label htmlFor="chat-avatar">
            <input
              style={{
                display: "none",
              }}
              id="chat-avatar"
              type="file"
              name="chat-avatar"
              onChange={(e) => {
                setAvatarName(chat.id);
                setAvatarFile(e.target.files[0]);
              }}
            />
            <SetButton type="button">Choose image</SetButton>
          </label>
          <ChangeButton
            type="submit"
            disabled={!avatarFile}
            style={{ flex: 0 }}
            onClick={(e) => handleAvatarImageSubmit(e)}
          >
            Set image
          </ChangeButton>
        </Form>
        {avatarFile && (
          <Image
            alt="chosen background"
            src={
              avatarFile
                ? URL.createObjectURL(avatarFile)
                : `/public/uploads/chats/${chat?.id}.webp`
            }
          />
        )}
      </BackgroundField>
      {showMemberModal && (
        <RemoveMemberModal
          setShowModal={setShowMemberModal}
          handleRemoveMember={handleRemoveMember}
        />
      )}
      {showAdminModal && (
        <RemoveAdminModal
          setShowModal={setShowAdminModal}
          handleRemoveAdmin={handleRemoveAdmin}
        />
      )}
    </ChatSettingsContainer>
  );
});

export default ChatSettings;
