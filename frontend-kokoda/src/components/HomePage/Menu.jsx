import { forwardRef } from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  height: calc(100vh - 80px);
  width: 80%;
  background-color: #00ff007d;
  margin-left: auto;
  margin-top: calc(-100vh + 80px);
  position: sticky;
  bottom: 40px;
  transform: ${({ $show }) => ($show ? "translateX(0%)" : "translateX(101%)")};
  transition: all 0.4s;
  //opacity: 0.7;
  z-index: 2;
  backdrop-filter: blur(5px);
`;

const Menu = forwardRef(function Menu({ menu }, ref) {
  return <MenuContainer $show={menu} ref={ref} />;
});

export default Menu;
