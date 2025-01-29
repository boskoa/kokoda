import { useSelector } from "react-redux";
import { selectAllChats } from "../../../features/chats/chatsSlice";
import styled from "styled-components";
import SingleChat from "./SingleChat";
import { useEffect, useState } from "react";
import ChatModal from "./ChatModal";
import AddChat from "./AddChat";

const ChatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  width: 100%;
  justify-content: start;
`;

function Chats() {
  const chats = useSelector(selectAllChats);
  const [addChatModal, setAddChatModal] = useState(false);

  useEffect(() => {
    document.getElementById("vp").scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <ChatsContainer>
      {chats.map((c) => (
        <SingleChat key={c.id} chat={c} />
      ))}
      <AddChat setAddChatModal={setAddChatModal} />
      {addChatModal && <ChatModal setAddChatModal={setAddChatModal} />}
    </ChatsContainer>
  );
}

export default Chats;
