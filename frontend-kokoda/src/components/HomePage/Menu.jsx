import styled from "styled-components";

const MenuContainer = styled.div`
  height: 100vh;
  width: 70%;
  background-color: lime;
  margin-left: auto;
  margin-top: -100vh;
  position: sticky;
  bottom: 0px;
  transform: ${({ $show }) => ($show ? "translateX(0%)" : "translateX(101%)")};
  transition: all 0.4s;
  opacity: 0.7;
  z-index: 2;
`;

function Menu({ menu }) {
  return <MenuContainer $show={menu} />;
}

export default Menu;
