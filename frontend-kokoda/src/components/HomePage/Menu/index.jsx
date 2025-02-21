import { forwardRef, useState } from "react";
import styled from "styled-components";
import BlockedContactsModal from "./BlockedContactsModal";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import userIcon from "/user.svg";
import axios from "axios";
import UserData from "./UserData";

const MenuContainer = styled.div`
  height: calc(100vh - 80px);
  width: 80%;
  background-color: #00ff007d;
  margin-left: auto;
  margin-top: calc(-100vh + 80px);
  position: sticky;
  bottom: 40px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  transform: ${({ $show }) => ($show ? "translateX(0%)" : "translateX(101%)")};
  transition: all 0.4s;
  z-index: 2;
  backdrop-filter: blur(5px);
  overflow: auto;
`;

const Title = styled.h3`
  text-align: center;
  color: white;
`;

const BackgroundField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
`;

const Image = styled.img`
  height: 120px;
  width: 220px;
  display: block;
  object-fit: contain;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 5px;
  width: 100%;
`;

export const Button = styled.button`
  border: none;
  background-color: coral;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 3px;
  cursor: pointer;
  transition: all 0.1s;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

const ChooseButton = styled.div`
  background-color: coral;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 3px;
  cursor: pointer;
  transition: all 0.1s;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

const Separator = styled.div`
  border-top: 1px solid gold;
`;

const Menu = forwardRef(function Menu({ menu }, ref) {
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [name, setName] = useState("Choose avatar");
  const [file, setFile] = useState(null);
  const loggedUser = useSelector(selectLoggedUser);

  async function handleImageSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
      await axios.post(`/api/avatars/${name}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${loggedUser.token}`,
        },
      });

      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function handleRemoveImage() {
    try {
      const response = await axios.delete(`/api/avatars/${loggedUser.id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${loggedUser.token}`,
        },
      });
      if (response.status === 200) {
        setDeletedBg(true);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <MenuContainer $show={menu} ref={ref}>
      <Title>Account settings</Title>
      <UserData />
      <Separator />
      <Button
        onClick={handleRemoveImage}
        style={{ textAlign: "center", marginBottom: -10 }}
      >
        Remove current avatar
      </Button>
      <BackgroundField>
        <Form id="avatar-form" encType="multipart/form-data">
          <label htmlFor="avatar" style={{ maxWidth: "70%" }}>
            <input
              style={{
                display: "none",
              }}
              id="avatar"
              type="file"
              name="avatar"
              onChange={(e) => {
                setName(`${loggedUser.id}`);
                setFile(e.target.files[0]);
              }}
            />
            <ChooseButton type="button">Choose image</ChooseButton>
          </label>
          <Button
            type="submit"
            disabled={!file}
            onClick={(e) => handleImageSubmit(e)}
          >
            Set
          </Button>
        </Form>
        <Image
          alt="chosen avatar"
          src={
            file
              ? URL.createObjectURL(file)
              : `/public/uploads/avatars/${loggedUser?.id}.webp`
          }
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = userIcon;
          }}
        />
      </BackgroundField>
      <Separator />
      <Button onClick={() => setShowBlockedModal(true)}>Blocked users</Button>
      <BlockedContactsModal
        showBlockedModal={showBlockedModal}
        setShowBlockedModal={setShowBlockedModal}
      />
    </MenuContainer>
  );
});

export default Menu;
