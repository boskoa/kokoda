import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  getDetailedChat,
  selectDetailedChatById,
  selectDetailedChatsLoading,
} from "../detailedChatsSlice";
import { useEffect } from "react";

function DetailedChat() {
  const { id } = useParams();
  const chat = useSelector((state) => selectDetailedChatById(state, id));
  const loading = useSelector(selectDetailedChatsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof chat === "undefined") {
      dispatch(getDetailedChat({ id }));
    }
  }, [id]);

  if ((typeof chat === "undefined" && !loading) || loading) {
    return "LOADING...";
  }

  return (
    <div>
      <p>{chat.id}</p>
      <p>{chat.name}</p>
      <p>{chat.body}</p>
      <NavLink to="/chats/1">back</NavLink>
      <NavLink to="/chats/3">forth</NavLink>
    </div>
  );
}

export default DetailedChat;
