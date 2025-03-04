import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/chats";

const chatsAdapter = createEntityAdapter();

const initialState = chatsAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getAllChats = createAsyncThunk(
  "chats/getAllChats",
  async (data) => {
    const { token } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    const response = await axios.get(BASE_URL, config);
    return response.data;
  },
);

export const updateChat = createAsyncThunk("chats/updateChat", async (data) => {
  const { token, updateData, id } = data;
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await axios.patch(`${BASE_URL}/${id}`, updateData, config);
  return response.data;
});

export const createChat = createAsyncThunk("chats/createChat", async (data) => {
  const { token, creationData } = data;
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await axios.post(BASE_URL, creationData, config);
  return response.data;
});

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addSocketMessage: (state, action) => {
      chatsAdapter.upsertOne(state, {
        id: action.payload.chatId,
        messages: [action.payload],
      });
    },
    clearChats: () => initialState,
    addGroupChat: (state, action) => {
      chatsAdapter.upsertOne(state, action.payload);
    },
    removeGroupChat: (state, action) => {
      chatsAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        chatsAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateChat.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        chatsAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        chatsAdapter.upsertOne(state, action.payload);
      })
      .addCase(createChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllChats,
  selectIds: selectChatsIds,
  selectById: selectChatById,
} = chatsAdapter.getSelectors((state) => state.chats);

export function selectChatsLoading(state) {
  return state.chats.loading;
}

export function selectChatsError(state) {
  return state.chats.error;
}

export const { addSocketMessage, clearChats, addGroupChat, removeGroupChat } =
  chatsSlice.actions;

export default chatsSlice.reducer;
