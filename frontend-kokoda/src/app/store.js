import { configureStore } from "@reduxjs/toolkit";
import chats from "../features/chats/chatsSlice";
import contacts from "../features/contacts/contactsSlice";
import detailedChats from "../features/detailedChats/detailedChatsSlice";

const store = configureStore({
  reducer: {
    chats,
    contacts,
    detailedChats,
  },
});

export default store;
