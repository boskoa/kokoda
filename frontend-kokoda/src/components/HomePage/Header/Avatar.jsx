import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import user from "/user.svg";
import { useEffect, useState } from "react";

const AvatarContainer = styled.div`
  position: absolute;
  left: 10px;
  height: 34px;
  width: ${({ $show }) => ($show ? "80px" : "34px")};
  border-radius: 17px;
  background-color: gold;
  display: flex;
  justify-content: start;
  align-items: center;
  overflow: hidden;
  transition: width 0.3s;
`;

const Image = styled.img`
  border: 2px solid gold;
  border-radius: 50%;
  height: 34px;
  width: 34px;
  opacity: 0;
  object-fit: contain;
  transition: all 1s;
  cursor: pointer;
  z-index: 2;
`;

const LogoutButton = styled.button`
  all: unset;
  position: absolute;
  top: 0;
  right: 0;
  height: 34px;
  background-color: gold;
  border-radius: 17px;
  cursor: pointer;
  color: #004949;
  font-size: 13px;
  font-weight: 600;
  padding-right: 5px;
  z-index: 1;
`;

function Avatar() {
  const loggedUser = useSelector(selectLoggedUser);
  const [show, setShow] = useState(false);

  return (
    <AvatarContainer $show={show}>
      <LogoutButton onClick={() => console.log("logout")}>logout</LogoutButton>
      <Image
        onClick={() => setShow((p) => !p)}
        src={`/public/uploads/avatars/${loggedUser.id}.png`}
        alt="user avatar"
        onLoad={(e) => {
          e.currentTarget.style.opacity = 1;
        }}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = user;
          e.currentTarget.style.opacity = 1;
        }}
      />
    </AvatarContainer>
  );
}

export default Avatar;
