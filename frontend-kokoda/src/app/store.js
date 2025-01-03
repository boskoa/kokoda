import { configureStore } from "@reduxjs/toolkit";
import chats from "../features/chats/chatsSlice";
import contacts from "../features/contacts/contactsSlice";
import login from "../features/login/loginSlice";
import users from "../features/users/usersSlice";

const store = configureStore({
  reducer: {
    chats,
    contacts,
    login,
    users,
  },
});

export default store;
