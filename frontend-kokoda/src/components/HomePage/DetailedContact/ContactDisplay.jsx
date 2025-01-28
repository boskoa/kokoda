import styled from "styled-components";
import userIcon from "/user.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectUserById, updateUser } from "../../../features/users/usersSlice";

const ContactDataContainer = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const UserIcon = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  opacity: 0;
  border-radius: 10px;
  transition: all 1s;
`;

const Label = styled.span`
  opacity: 0.6;
`;

const ContactData = styled.p`
  align-self: start;
  background-color: #00808079;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  font-size: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
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

function ContactDisplay({ contact, user, loggedUser }) {
  const blocked =
    user.blockedUsers !== null ? user.blockedUsers.includes(contact.id) : false;
  const dispatch = useDispatch();

  function handleBlock() {
    dispatch(
      updateUser({
        token: loggedUser.token,
        updateData: {
          blockedUsers:
            user.blockedUsers === null
              ? [contact.id]
              : blocked
                ? user.blockedUsers.filter((u) => u !== contact.id)
                : [...new Set([...user.blockedUsers, contact.id])],
        },
        id: loggedUser.id,
      }),
    );
  }

  return (
    <ContactDataContainer>
      <UserIcon
        src={`/public/uploads/avatars/${contact.id}.webp`}
        alt="user avatar"
        onLoad={(e) => {
          e.currentTarget.style.opacity = 1;
        }}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = userIcon;
          e.currentTarget.style.opacity = 1;
        }}
        height="100%"
        width="100%"
      />
      <ContactData>
        <Label>Name:</Label> {contact.name}
      </ContactData>
      <ContactData>
        <Label>Username:</Label> {contact.username}
      </ContactData>
      <ContactData>
        <Label>E-mail:</Label> {contact.email}
      </ContactData>
      <ButtonContainer>
        <Button onClick={handleBlock}>{blocked ? "Unblock" : "Block"}</Button>
        <Button>Remove</Button>
      </ButtonContainer>
    </ContactDataContainer>
  );
}

export default ContactDisplay;
