import { useSelector } from "react-redux";
import { selectAllChats } from "../../../features/chats/chatsSlice";
import styled from "styled-components";
import SingleChat from "./SingleChat";
import { useEffect, useState } from "react";
import ChatModal from "./ChatModal";
import AddChat from "./AddChat";
import Search from "../Search";
import { selectAllContacts } from "../../../features/contacts/contactsSlice";
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
  const chats = useSelector(selectAllChats);
  const contacts = useSelector(selectAllContacts);
  const loggedUser = useSelector(selectLoggedUser);
  const [filter, setFilter] = useState("");
  const [addChatModal, setAddChatModal] = useState(false);

  useEffect(() => {
    document.getElementById("vp").scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <ChatsContainer>
      <Search filter={filter} setFilter={setFilter} />
      {chats
        .filter((c) =>
          c.name
            ? c.name.toLowerCase().includes(filter)
            : contacts
                .find(
                  (contact) =>
                    contact.id === c.members.find((m) => m !== loggedUser.id),
                )
                .name.toLowerCase()
                .includes(filter),
        )
        .map((c) => (
          <SingleChat key={c.id} chat={c} />
        ))}
      <AddChat setAddChatModal={setAddChatModal} />
      {addChatModal && <ChatModal setAddChatModal={setAddChatModal} />}
    </ChatsContainer>
  );
}

export default Chats;
