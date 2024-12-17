import styled from "styled-components";
import gear from "../../../assets/gear.svg";

const MenuButtonContainer = styled.button`
  all: unset;
  position: absolute;
  right: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: rotateZ(90deg);
  }
`;

function MenuButton({ setMenu }) {
  return (
    <MenuButtonContainer onClick={() => setMenu((p) => !p)}>
      <img
        src={gear}
        style={{
          filter:
            "brightness(0) saturate(100%) invert(91%) sepia(17%) saturate(4935%) hue-rotate(357deg) brightness(99%) contrast(105%)",
        }}
      />
    </MenuButtonContainer>
  );
}

export default MenuButton;
