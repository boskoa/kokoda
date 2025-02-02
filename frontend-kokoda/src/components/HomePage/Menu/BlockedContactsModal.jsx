import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import { selectUserById, updateUser } from "../../../features/users/usersSlice";
import { selectAllContacts } from "../../../features/contacts/contactsSlice";
import { Button } from ".";

const BlockedContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  backdrop-filter: blur(2px);
  background-color: #6e2500e5;
  display: ${({ $show }) => ($show ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px;
  z-index: 3;
`;

const Title = styled.h3`
  font-size: 14px;
  color: white;
  text-align: center;
`;

const ContactsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Contact = styled.button`
  padding: 3px;
  background-color: teal;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

function BlockedContactsModal({ showBlockedModal, setShowBlockedModal }) {
  const loggedUser = useSelector(selectLoggedUser);
  const user = useSelector((state) => selectUserById(state, loggedUser.id));
  const blocked = useSelector(selectAllContacts).filter((c) =>
    user?.blockedUsers?.includes(c.id),
  );
  const dispatch = useDispatch();

  function handleUnblockUser(id) {
    dispatch(
      updateUser({
        token: loggedUser.token,
        updateData: { blockedUsers: user.blockedUsers.filter((u) => u !== id) },
        id: loggedUser.id,
      }),
    );
  }

  return (
    <BlockedContainer $show={showBlockedModal}>
      <Title>Blocked users (click to unblock)</Title>
      <ContactsContainer>
        {blocked?.map((b) => (
          <Contact onClick={() => handleUnblockUser(b.id)} key={b.id}>
            {b.name}
          </Contact>
        ))}
      </ContactsContainer>
      <Button onClick={(e) => setShowBlockedModal(false)}>Close</Button>
    </BlockedContainer>
  );
}

export default BlockedContactsModal;
