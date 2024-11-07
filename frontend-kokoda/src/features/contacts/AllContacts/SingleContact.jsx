import styled, { keyframes } from "styled-components";
import user from "/user.svg";

const ContactContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: start;
  gap: 5px;
  width: 100%;
  height: 60px;
  position: relative;
`;

const Avatar = styled.div`
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  border: 2px solid rgba(125, 235, 155, 0.5);
`;

const imageShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const UserIcon = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 50%;
  opacity: 0;
  //animation: 1s ${imageShow} 0.5s forwards;
  transition: all 1s;
`;

const ContactData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
  gap: 5px;
  width: calc(100% - 60px - 5px);
  position: relative;
`;

const ContactBackground = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(100, 100, 100, 0.2),
    rgba(100, 100, 100, 0.2) 20%,
    transparent
  );
  border-radius: 30px;
  z-index: -1;
`;

const ContactName = styled.h2`
  font-size: 14px;
  height: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-top: 5px;
`;

const LastMessage = styled.p`
  height: 50%;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

function SingleContact({ contact }) {
  return (
    <ContactContainer>
      <Avatar>
        <UserIcon
          src={`/public/uploads/avatars/${contact.id}.webp`}
          alt="user avatar"
          onLoad={(e) => {
            e.currentTarget.opacity = 1;
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = user;
            e.currentTarget.style.opacity = 1;
          }}
          height="100%"
          width="100%"
        />
      </Avatar>
      <ContactData>
        <ContactName>{contact.name}</ContactName>
        <LastMessage>{contact.company.catchPhrase}</LastMessage>
      </ContactData>
      <ContactBackground />
    </ContactContainer>
  );
}

export default SingleContact;
