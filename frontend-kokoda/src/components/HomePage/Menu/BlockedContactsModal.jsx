import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import { selectUserById } from "../../../features/users/usersSlice";
import { selectAllContacts } from "../../../features/contacts/contactsSlice";

const BlockedContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  backdrop-filter: blur(2px);
  background-color: #ffd9009f;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px;
`;

const ContactContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

function BlockedContactsModal() {
  const loggedUser = useSelector(selectLoggedUser);
  const user = useSelector((state) => selectUserById(state, loggedUser.id));
  const blocked = useSelector(selectAllContacts).filter((c) =>
    user.blockedUsers.includes(c.id),
  );

  if (!user?.blockedUsers) return null;

  return (
    <BlockedContainer>
      {blocked.map((b) => (
        <ContactContainer key={b.id}>{b.name}</ContactContainer>
      ))}
    </BlockedContainer>
  );
}

export default BlockedContactsModal;
