import styled from "styled-components";
import user from "/user.svg";
import { useLayoutEffect, useRef, useState } from "react";
import trimText from "../../../utils/trimText";

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

const UserIcon = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 50%;
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
  height: 20px;
  position: relative;
`;

const LastMessage = styled.p`
  flex: 1;
  font-size: 12px;
  max-height: calc(100% - 20px);
`;

function SingleContact({ contact }) {
  const nameRef = useRef();
  const messageRef = useRef();
  const [name, setName] = useState(contact.name);
  const [message, setMessage] = useState(contact.company.catchPhrase);

  useLayoutEffect(() => {
    trimText(nameRef.current, contact.name, setName);
    trimText(messageRef.current, contact.company.catchPhrase, setMessage);
  }, []);

  return (
    <ContactContainer>
      <Avatar>
        <UserIcon
          src={`/public/uploads/avatars/${contact.id}.webp`}
          alt="user avatar"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = user;
          }}
          height="100%"
          width="100%"
        />
      </Avatar>
      <ContactData>
        <ContactName ref={nameRef}>
          <span>{name}</span>
        </ContactName>
        <LastMessage ref={messageRef}>
          <span>{message}</span>
        </LastMessage>
      </ContactData>
      <ContactBackground></ContactBackground>
    </ContactContainer>
  );
}

export default SingleContact;
