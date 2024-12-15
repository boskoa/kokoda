import { configureStore } from "@reduxjs/toolkit";
import chats from "../features/chats/chatsSlice";
import contacts from "../features/contacts/contactsSlice";
import detailedChats from "../features/detailedChats/detailedChatsSlice";
import login from "../features/login/loginSlice";

const store = configureStore({
  reducer: {
    chats,
    contacts,
    detailedChats,
    login,
  },
});

export default store;
