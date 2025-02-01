import { forwardRef, useState } from "react";
import styled from "styled-components";
import BlockedContactsModal from "./BlockedContactsModal";

const MenuContainer = styled.div`
  height: calc(100vh - 80px);
  width: 80%;
  background-color: #00ff007d;
  margin-left: auto;
  margin-top: calc(-100vh + 80px);
  position: sticky;
  bottom: 40px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transform: ${({ $show }) => ($show ? "translateX(0%)" : "translateX(101%)")};
  transition: all 0.4s;
  //opacity: 0.7;
  z-index: 2;
  backdrop-filter: blur(5px);
  overflow: auto;
`;

export const Button = styled.button`
  width: 100px;
  border: none;
  background-color: coral;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 3px;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

const Menu = forwardRef(function Menu({ menu }, ref) {
  const [showBlockedModal, setShowBlockedModal] = useState(false);

  return (
    <MenuContainer $show={menu} ref={ref}>
      <Button onClick={() => setShowBlockedModal(true)}>Blocked users</Button>
      <BlockedContactsModal
        showBlockedModal={showBlockedModal}
        setShowBlockedModal={setShowBlockedModal}
      />
    </MenuContainer>
  );
});

export default Menu;
