import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { addGroupChat, updateChat } from "../../../features/chats/chatsSlice";

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
  background-color: #008080b3;
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

const Option = styled.option``;

function GroupChatModal({ setJoinChatModal }) {
  const [publicChats, setPublicChats] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(undefined);
  const loggedUser = useSelector(selectLoggedUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPublicChats() {
      const config = {
        headers: {
          Authorization: `bearer ${loggedUser.token}`,
        },
      };
      const response = await axios.get("/api/chats/public-chats", config);
      setPublicChats(response.data);
    }
    if (loggedUser.id) {
      try {
        getPublicChats();
      } catch (error) {
        console.log(error);
      }
    }
  }, [loggedUser.id]);

  function handleJoinGroup() {
    if (selectedGroup) {
      const newGroup = publicChats.find(
        (pc) => pc.id === parseInt(selectedGroup),
      );
      dispatch(addGroupChat(newGroup));
      dispatch(
        updateChat({
          token: loggedUser.token,
          updateData: {
            members: [...newGroup.members, loggedUser.id],
          },
          id: parseInt(selectedGroup),
        }),
      );
      setSelectedGroup(undefined);
      setPublicChats((p) =>
        p.filter((pc) => pc.id !== parseInt(selectedGroup)),
      );
    }
  }

  return (
    <ModalContainer>
      <AddChatContainer>
        <AddContainer>
          <Label htmlFor="AddGroupChat">Select group</Label>
          <SelectField
            id="AddGroupChat"
            name="AddGroupChat"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <Option></Option>
            {publicChats
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((c) => (
                <Option value={c.id} key={c.id}>
                  {c.name}
                </Option>
              ))}
          </SelectField>
        </AddContainer>
        <AddContainer>
          <Button onClick={() => setJoinChatModal(false)}>Close</Button>
          <Button onClick={handleJoinGroup}>Join Group</Button>
        </AddContainer>
      </AddChatContainer>
    </ModalContainer>
  );
}

export default GroupChatModal;
