import { configureStore } from "@reduxjs/toolkit";
import chats from "../features/chats/chatsSlice";
import contacts from "../features/contacts/contactsSlice";
import login from "../features/login/loginSlice";
import users from "../features/users/usersSlice";
import unseen from "../features/unseen/unseenSlice";

const store = configureStore({
  reducer: {
    chats,
    contacts,
    login,
    users,
    unseen,
  },
});

export default store;
