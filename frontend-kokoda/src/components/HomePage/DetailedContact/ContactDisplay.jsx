import styled from "styled-components";
import user from "/user.svg";

const ContactDataContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const UserIcon = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
  opacity: 0;
  border-radius: 10px;
  transition: all 1s;
`;

const ContactData = styled.p`
  align-self: start;
  background-color: #00808079;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
`;

function ContactDisplay({ contact }) {
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
          e.currentTarget.src = user;
          e.currentTarget.style.opacity = 1;
        }}
        height="100%"
        width="100%"
      />
      <ContactData>Name: {contact.name}</ContactData>
      <ContactData>Username: {contact.username}</ContactData>
    </ContactDataContainer>
  );
}

export default ContactDisplay;
