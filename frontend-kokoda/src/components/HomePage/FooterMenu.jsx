import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

const FooterMenuContainer = styled.div`
  position: sticky;
  bottom: 0px;
  height: 40px;
  margin-top: -40px;
  z-index: 1;
  display: flex;
  transform: ${({ $translate }) => $translate};
  transition: all 0.3s;
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
`;

const buttonAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  5% {
    transform: scale(0.2);
    opacity: 0.3;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const FooterButtonContainer = styled(NavLink)`
  height: 100%;
  width: 50%;
  background-color: ${({ theme, $color }) => theme.footerButton[$color]};
  border: none;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  color: ${({ theme }) => theme.footerButton.fg};
  text-shadow: 0px 0px 2px black;
  transition: all 0.2s;

  &.active {
    text-shadow: 0px 0px 10px black;
    border-top: 2px solid gold;
    border-bottom: 2px solid gold;
    font-size: 1.15em;
  }

  &:active::before {
    content: "";
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    animation: ${() => css`0.3s ${buttonAnimation} forwards`};
  }
`;

function FooterMenu() {
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  const hide = isNaN(pathArray[pathArray.length - 1]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!hide) {
      setTimeout(() => setShow(false), 1000);
    } else {
      setShow(true);
    }
  }, [hide]);

  return (
    <FooterMenuContainer
      $show={show}
      $translate={hide ? "" : "translateX(100%)"}
    >
      <FooterButtonContainer to="/chats" $color={"bg1"}>
        Chats
      </FooterButtonContainer>
      <FooterButtonContainer to="/contacts" $color={"bg2"}>
        Contacts
      </FooterButtonContainer>
    </FooterMenuContainer>
  );
}

export default FooterMenu;
