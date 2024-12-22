import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/chats";

const initialState = {
  loading: false,
  error: null,
  chat: null,
};

export const getDetailedChat = createAsyncThunk(
  "detailedChat/getDetailedChat",
  async (data) => {
    const { token, id } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.get(BASE_URL + "/" + id, config);

    return response.data;
  },
);

const detailedChatSlice = createSlice({
  name: "detailedChat",
  initialState,
  reducers: {
    clearChat: (state) => {
      state.chat = null;
    },
    updateChat: (state, action) => {
      state.chat.messages.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetailedChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDetailedChat.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.chat = action.payload;
      })
      .addCase(getDetailedChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export function selectDetailedChat(state) {
  return state.detailedChat.chat;
}

export function selectDetailedChatLoading(state) {
  return state.detailedChat.loading;
}

export function selectDetailedChatError(state) {
  return state.detailedChat.error;
}

export const { clearChat, updateChat } = detailedChatSlice.actions;

export default detailedChatSlice.reducer;
