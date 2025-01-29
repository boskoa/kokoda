import styled from "styled-components";
import { IoAddCircleSharp } from "react-icons/io5";
import { IconContext } from "react-icons";

const AddContactContainer = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  position: fixed;
  bottom: 46px;
  align-self: end;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: transparent;
  box-shadow: 0 0 10px 0 gold;
  transition: all 0.1s;

  &:active {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 gold;
  }
`;

function AddContact({ setAddContactModal }) {
  return (
    <AddContactContainer
      onClick={() => setAddContactModal(true)}
      title="Add contact"
    >
      <IconContext.Provider value={{ color: "gold", size: "36px" }}>
        <IoAddCircleSharp />
      </IconContext.Provider>
    </AddContactContainer>
  );
}

export default AddContact;
