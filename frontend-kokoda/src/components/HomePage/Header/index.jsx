import styled from "styled-components";
import Logo from "./Logo";
import MenuButton from "./MenuButton";
import Avatar from "./Avatar";
import { useLocation } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";

const HeaderMenuContainer = styled.header`
  position: sticky;
  top: 0px;
  height: 40px;
  margin-top: 0px;
  margin-bottom: 5px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 128, 128, 0.7);
  backdrop-filter: blur(20px);
  transform: ${({ $translate }) => $translate};
  transition: all 0.3s;
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
`;

const Header = forwardRef(function Header({ setMenu }, ref) {
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
    <HeaderMenuContainer
      $translate={hide ? "" : "translateY(-40px)"}
      $show={show}
      ref={ref}
    >
      <Avatar />
      <Logo />
      <MenuButton setMenu={setMenu} />
    </HeaderMenuContainer>
  );
});

export default Header;
