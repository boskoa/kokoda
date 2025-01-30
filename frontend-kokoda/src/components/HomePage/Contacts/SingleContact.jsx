import styled from "styled-components";
import user from "/user.svg";
import { useNavigate } from "react-router-dom";

const ContactContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: start;
  gap: 10px;
  width: 100%;
  height: 60px;
  position: relative;
  cursor: pointer;
`;

const Avatar = styled.div`
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  box-shadow: 0 0 5px 0 rgba(125, 235, 155, 1);
`;

const UserIcon = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 50%;
  opacity: 0;
  transition: all 1s;
`;

const ContactData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

function SingleContact({ contact }) {
  const navigate = useNavigate();

  return (
    <ContactContainer onClick={() => navigate(`/contacts/${contact.id}`)}>
      <Avatar>
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
      </Avatar>
      <ContactData>
        <ContactName>{contact.name}</ContactName>
      </ContactData>
      <ContactBackground />
    </ContactContainer>
  );
}

export default SingleContact;
