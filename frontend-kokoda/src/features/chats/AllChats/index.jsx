import { useDispatch, useSelector } from "react-redux";
import {
  selectAllChats,
  selectChatsLoading,
} from "../../../features/chats/chatsSlice";
import styled from "styled-components";
import SingleChat from "./SingleChat";
import { useEffect, useRef, useState } from "react";
import Spinner from "../../../components/Spinner";
import useIntersectionObserver from "../../../customHooks/useIntersectionObserver";

const AllChatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  width: 100%;
  justify-content: start;
`;

function AllChats() {
  const chats = useSelector(selectAllChats);
  const endRef = useRef(null);
  const intersecting = useIntersectionObserver(endRef);
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const loading = useSelector(selectChatsLoading);
  const limit = 10;
  /* finish this
  useEffect(() => {
    if (intersecting) {
      dispatch
    }
  }, [intersecting])
 */
  return (
    <AllChatsContainer>
      {chats.map((c) => (
        <SingleChat key={c.id} chat={c} />
      ))}
      <Spinner endRef={endRef} loading={true} />
    </AllChatsContainer>
  );
}

export default AllChats;
