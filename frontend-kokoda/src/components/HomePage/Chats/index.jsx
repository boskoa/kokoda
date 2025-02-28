import { useSelector } from "react-redux";
import { selectAllChats } from "../../../features/chats/chatsSlice";
import styled from "styled-components";
import SingleChat from "./SingleChat";
import { useEffect, useState } from "react";
import ChatModal from "./ChatModal";
import AddChat from "./AddChat";
import Search from "../Search";
import { selectLoggedUser } from "../../../features/login/loginSlice";
import JoinGroupChat from "./JoinGroupChat";
import GroupChatModal from "./GroupChatModal";
import { selectAllUsers } from "../../../features/users/usersSlice";

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
  const users = useSelector(selectAllUsers);
  const loggedUser = useSelector(selectLoggedUser);
  const [filter, setFilter] = useState("");
  const [addChatModal, setAddChatModal] = useState(false);
  const [joinChatModal, setJoinChatModal] = useState(false);

  useEffect(() => {
    document.getElementById("vp").scrollTo({ top: 0 });
  }, []);

  return (
    <ChatsContainer>
      <Search filter={filter} setFilter={setFilter} />
      {chats.length
        ? chats
            .filter((c) =>
              c.name
                ? c.name.toLowerCase().includes(filter)
                : users
                    .find(
                      (u) =>
                        u.id === c.members?.find((m) => m !== loggedUser.id),
                    )
                    ?.name.toLowerCase()
                    .includes(filter),
            )
            .sort(
              (a, b) =>
                new Date(b.messages[0]?.createdAt) -
                new Date(a.messages[0]?.createdAt),
            )
            .map((c) => <SingleChat key={c.id} chat={c} />)
        : null}
      <AddChat setAddChatModal={setAddChatModal} />
      <JoinGroupChat setJoinChatModal={setJoinChatModal} />
      {addChatModal && <ChatModal setAddChatModal={setAddChatModal} />}
      {joinChatModal && <GroupChatModal setJoinChatModal={setJoinChatModal} />}
    </ChatsContainer>
  );
}

export default Chats;
