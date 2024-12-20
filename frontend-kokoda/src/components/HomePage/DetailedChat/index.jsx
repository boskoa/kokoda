import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  getDetailedChat,
  selectDetailedChat,
} from "../../../features/detailedChat/detailedChatSlice";
import { useEffect } from "react";
import { selectLoggedUser } from "../../../features/login/loginSlice";

function DetailedChat() {
  const { id } = useParams();
  const loggedUser = useSelector(selectLoggedUser);
  const chat = useSelector(selectDetailedChat);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && loggedUser) {
      dispatch(getDetailedChat({ token: loggedUser.token, id }));
    }
  }, [id, loggedUser]);

  if (!chat) return "loading";

  return (
    <div>
      <p>{chat.id}</p>
      <p>{chat.name}</p>
      {chat.messages.map((m) => (
        <p key={m.id}>{m.text}</p>
      ))}
      <p>{chat.body}</p>
      <NavLink to="/chats/1">back</NavLink>
      <NavLink to="/chats/3">forth</NavLink>
    </div>
  );
}

export default DetailedChat;
