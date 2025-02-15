import styled from "styled-components";
import user from "/user.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import { selectUserById } from "../../../features/users/usersSlice";

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
  justify-content: space-between;
  align-items: center;
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Blocked = styled.span`
  padding: 2px;
  background-color: gold;
  color: black;
  font-size: 12px;
  border-radius: 3px;
`;

function SingleContact({ contact }) {
  const navigate = useNavigate();
  const loggedUser = useSelector(selectLoggedUser);
  const userData = useSelector((state) => selectUserById(state, loggedUser.id));

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
        {userData.blockedUsers?.includes(contact.id) && (
          <Blocked>Blocked</Blocked>
        )}
      </ContactData>
      <ContactBackground />
    </ContactContainer>
  );
}

export default SingleContact;
