import styled from "styled-components";
import user from "/user.svg";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
  //background: linear-gradient(90deg, rgba(0, 0, 0, 0.5) 30%, transparent);
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
  flex: 1;
  width: calc(100% - 60px - 5px);
  position: relative;
  height: 100%;
  //border: 1px solid red;
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
  //border: 1px solid red;
`;

const ContactName = styled.h2`
  min-height: 40%;
  font-size: 14px;
  //overflow: hidden;
  //flex: 1;
`;

const LastMessage = styled.p`
  height: 60%;
  font-size: 12px;
`;

function SingleContact({ contact }) {
  const dataRef = useRef();
  const nameRef = useRef();
  const messageRef = useRef();
  const [name, setName] = useState(contact.name);

  useLayoutEffect(() => {
    const testElement = document.createElement("span");
    nameRef.current.appendChild(testElement);
    let length = 0;
    for (const char of contact.name) {
      testElement.innerText += char;
      length++;
      if (
        testElement.getBoundingClientRect().width > dataRef.current.clientWidth
      ) {
        length -= 3;
        setName(contact.name.slice(0, length) + "...");
        break;
      }
    }

    nameRef.current.removeChild(testElement);
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
      <ContactData ref={dataRef}>
        <ContactName>
          <span ref={nameRef}>{name}</span>
        </ContactName>
        <LastMessage>proba</LastMessage>
      </ContactData>
      <ContactBackground></ContactBackground>
    </ContactContainer>
  );
}

export default SingleContact;
