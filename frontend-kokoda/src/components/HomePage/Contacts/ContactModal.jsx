import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import axios from "axios";
import {
  getAllContacts,
  selectAllContacts,
} from "../../../features/contacts/contactsSlice";
import { selectUserById, updateUser } from "../../../features/users/usersSlice";

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
`;

const AddContactContainer = styled.div`
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
  align-items: stretch;
  align-self: stretch;
`;

const Button = styled.button`
  width: 60px;
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

function ContactModal({ setAddContactModal }) {
  const [users, setUsers] = useState([]);
  const [addedContact, setAddedContact] = useState(-1);
  const loggedUser = useSelector(selectLoggedUser);
  const user = useSelector((state) => selectUserById(state, loggedUser.id));
  const contacts = useSelector(selectAllContacts);
  const dispatch = useDispatch();

  function handleAddUser() {
    if (addedContact !== -1) {
      dispatch(
        updateUser({
          token: loggedUser.token,
          updateData: {
            contacts: [
              ...new Set(
                user.contacts?.length
                  ? [...user.contacts, parseInt(addedContact)]
                  : [parseInt(addedContact)],
              ),
            ],
          },
          id: loggedUser.id,
        }),
      );
      setAddedContact(-1);
      setUsers((p) => p.filter((u) => parseInt(addedContact) !== u.id));
      setTimeout(
        () => dispatch(getAllContacts({ token: loggedUser.token })),
        300,
      );
    }
  }

  useEffect(() => {
    async function getUsers() {
      const config = {
        headers: {
          Authorization: `bearer ${loggedUser.token}`,
        },
      };

      const response = await axios.get("/api/users", config);
      setUsers(() =>
        response.data.filter(
          (u) =>
            !contacts.map((c) => c.id).includes(u.id) && u.id !== loggedUser.id,
        ),
      );
    }

    if (loggedUser) {
      getUsers();
    }
  }, [loggedUser]);

  return (
    <ModalContainer>
      <AddContactContainer>
        <AddContainer>
          <SelectField
            name="AddContact"
            value={addedContact}
            onChange={(e) => setAddedContact(e.target.value)}
          >
            <Option></Option>
            {users
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((u) => (
                <Option value={u.id} key={u.id}>
                  {u.name}
                </Option>
              ))}
          </SelectField>
          <Button disabled={addedContact === -1} onClick={handleAddUser}>
            Add user
          </Button>
        </AddContainer>
        <Button onClick={() => setAddContactModal(false)}>Close</Button>
      </AddContactContainer>
    </ModalContainer>
  );
}

export default ContactModal;
