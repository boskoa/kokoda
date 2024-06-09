import { useSelector } from "react-redux";
import { selectAllChats } from "../../../features/chats/chatsSlice";
import styled from "styled-components";
import SingleChat from "./SingleChat";

const AllChatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  width: 100%;
  justify-content: start;
`;

function AllChats() {
  const chats = useSelector(selectAllChats);

  return (
    <AllChatsContainer>
      {chats.map((c) => (
        <SingleChat key={c.id} chat={c} />
      ))}
    </AllChatsContainer>
  );
}

export default AllChats;
