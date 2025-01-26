import {
  ButtonsContainer,
  DialogBox,
  DialogButton,
  RemoveContainer,
  Title,
} from "./RemoveMemberModal";

function RemoveAdminModal({ setShowModal, handleRemoveAdmin }) {
  return (
    <RemoveContainer>
      <DialogBox>
        <Title>Remove admin?</Title>
        <ButtonsContainer>
          <DialogButton onClick={() => setShowModal(false)}>No</DialogButton>
          <DialogButton
            onClick={() => {
              setShowModal(false);
              handleRemoveAdmin();
            }}
          >
            Yes
          </DialogButton>
        </ButtonsContainer>
      </DialogBox>
    </RemoveContainer>
  );
}

export default RemoveAdminModal;
