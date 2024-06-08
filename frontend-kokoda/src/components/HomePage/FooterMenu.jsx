import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

const FooterMenuContainer = styled.div`
  position: sticky;
  bottom: 0px;
  height: 40px;
  margin-top: -40px;
  z-index: 1;
  display: flex;
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

const FooterButtonContainer = styled(Link)`
  height: 100%;
  width: 50%;
  background-color: ${({ theme, $color }) => theme.footerButton[$color]};
  border: none;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  color: ${({ theme }) => theme.footerButton.fg};

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
  return (
    <FooterMenuContainer>
      <FooterButtonContainer to="/home" $color={"bg1"}>
        Chats
      </FooterButtonContainer>
      <FooterButtonContainer to="/home/contacts" $color={"bg2"}>
        Contacts
      </FooterButtonContainer>
    </FooterMenuContainer>
  );
}

export default FooterMenu;
