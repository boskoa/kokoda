import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { logout, selectLoggedUser } from "../../../features/login/loginSlice";
import user from "/user.svg";
import { useEffect, useState } from "react";

const AvatarContainer = styled.div`
  position: absolute;
  left: 10px;
  height: 30px;
  width: ${({ $show }) => ($show ? "80px" : "30px")};
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
  height: 30px;
  width: 30px;
  opacity: 0;
  object-fit: contain;
  transition: all 1s;
  cursor: pointer;
  z-index: 2;
`;

const apear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LogoutButton = styled.button`
  all: unset;
  position: absolute;
  top: 0;
  right: 0;
  height: 30px;
  background-color: gold;
  border-radius: 17px;
  cursor: pointer;
  color: #004949;
  font-size: 13px;
  font-weight: 600;
  padding-right: 5px;
  z-index: 0;
  animation: 0.3s ${apear} 1s both;
`;

function Avatar() {
  const loggedUser = useSelector(selectLoggedUser);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  return (
    <AvatarContainer $show={show}>
      <LogoutButton onClick={() => dispatch(logout())}>logout</LogoutButton>
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
