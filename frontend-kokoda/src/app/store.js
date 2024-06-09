import chats from "../features/chats/chatsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    chats,
  },
});

export default store;
