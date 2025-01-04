import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/unseens";

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

export const updateUnseen = createAsyncThunk(
  "unseen/updateUnseen",
  async (data) => {
    const { token, count, chatId } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.post(BASE_URL, { count, chatId }, config);
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
      })
      .addCase(updateUnseen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUnseen.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        unseenAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateUnseen.rejected, (state, action) => {
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
