import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/comments";

const detailedChatsAdapter = createEntityAdapter();

const initialState = detailedChatsAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getDetailedChat = createAsyncThunk(
  "getDetailedChat",
  async (data) => {
    const { id } = data;
    /*
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }; */
    const response = await axios.get(BASE_URL + "/" + id);
    return response.data;
  },
);

const detailedChatsSlice = createSlice({
  name: "detailedChats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetailedChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDetailedChat.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        detailedChatsAdapter.upsertOne(state, action.payload);
      })
      .addCase(getDetailedChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllDetailedChats,
  selectIds: selectDetailedChatsIds,
  selectById: selectDetailedChatById,
} = detailedChatsAdapter.getSelectors((state) => state.detailedChats);

export function selectDetailedChatsLoading(state) {
  return state.detailedChats.loading;
}

export default detailedChatsSlice.reducer;
