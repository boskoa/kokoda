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
    const { token, offset, limit } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    //change query when quering db
    const response = await axios.get(
      BASE_URL, // + `?_start=${offset}&_limit=${limit}`,
      config,
    );
    return response.data;
  },
);

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
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

export default chatsSlice.reducer;
