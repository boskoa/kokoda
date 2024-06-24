import chats from "../features/chats/chatsSlice";
import contacts from "../features/contacts/contactsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    chats,
    contacts,
  },
});

export default store;
