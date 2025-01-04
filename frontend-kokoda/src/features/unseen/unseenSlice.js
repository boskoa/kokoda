import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/unseen";

const unseenAdapter = createEntityAdapter();

const initialState = unseenAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getAllUnseen = createEntityAdapter(
  "unseen/getAllUnseen",
  async (token) => {
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.get(BASE_URL, config);
    return response.data;
  },
);

const unseenSlice = createSlice({
  name: "unseen",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUnseen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUnseen.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        unseenAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllUnseen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllUnseen,
  selectIds: selectUnseenIds,
  selectById: selectUnseenById,
} = unseenAdapter.getSelectors((state) => state.unseen);

export function selectUnseenLoading(state) {
  return state.unseen.loading;
}

export default unseenSlice.reducer;
