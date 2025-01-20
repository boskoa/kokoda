import { useDispatch, useSelector } from "react-redux";
import {
  getAllChats,
  selectAllChats,
} from "../../../features/chats/chatsSlice";
import styled from "styled-components";
import SingleChat from "./SingleChat";
import { useEffect } from "react";
import { selectLoggedUser } from "../../../features/login/loginSlice";

const ChatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  width: 100%;
  justify-content: start;
`;

function Chats() {
  const loggedUser = useSelector(selectLoggedUser);
  const chats = useSelector(selectAllChats);
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById("vp").scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    dispatch(getAllChats({ token: loggedUser.token }));
  }, [loggedUser]);

  return (
    <ChatsContainer>
      {chats.map((c) => (
        <SingleChat key={c.id} chat={c} />
      ))}
    </ChatsContainer>
  );
}

export default Chats;
