import styled from "styled-components";

export const RemoveContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8080806e;
  backdrop-filter: blur(2px);
`;

export const DialogBox = styled.div`
  width: 160px;
  background-color: teal;
  padding: 10px;
`;

export const Title = styled.h4`
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const DialogButton = styled.button`
  width: 40px;
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

function RemoveMemberModal({ setShowModal, handleRemoveMember }) {
  return (
    <RemoveContainer>
      <DialogBox>
        <Title>Remove member?</Title>
        <ButtonsContainer>
          <DialogButton onClick={() => setShowModal(false)}>No</DialogButton>
          <DialogButton
            onClick={() => {
              setShowModal(false);
              handleRemoveMember();
            }}
          >
            Yes
          </DialogButton>
        </ButtonsContainer>
      </DialogBox>
    </RemoveContainer>
  );
}

export default RemoveMemberModal;
