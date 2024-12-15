import { useDispatch, useSelector } from "react-redux";
import {
  getAllChats,
  selectAllChats,
  selectChatsLoading,
} from "../../../features/chats/chatsSlice";
import styled from "styled-components";
import SingleChat from "./SingleChat";
import { useEffect, useRef, useState } from "react";
import Spinner from "../../Spinner";
import useIntersectionObserver from "../../../customHooks/useIntersectionObserver";

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
  const endRef = useRef(null);
  const intersecting = useIntersectionObserver(endRef);
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(chats.length);
  const loading = useSelector(selectChatsLoading);
  const limit = 20;

  useEffect(() => {
    document.getElementById("vp").scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (intersecting && chats.length % limit === 0 && chats.length >= offset) {
      dispatch(
        getAllChats({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNzMzMDA3NTc2fQ.y8vfgSOqsPf1TxBn1SxjFkjKMSW3BsNOJdXdZDd28l0",
          offset,
          limit,
        }),
      );
      setOffset((p) => p + limit);
    }
  }, [intersecting]);

  return (
    <ChatsContainer>
      {chats.map((c) => (
        <SingleChat key={c.id} chat={c} />
      ))}
      <Spinner endRef={endRef} loading={loading} />
    </ChatsContainer>
  );
}

export default Chats;
