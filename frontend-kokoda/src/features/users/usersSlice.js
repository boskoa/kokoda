import axios from "axios";

import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const BASE_URL = "/api/users";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  loading: false,
  error: null,
});

export const createUser = createAsyncThunk("users/createUser", async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
});

export const getUser = createAsyncThunk("users/getUser", async (data) => {
  const { token, id } = data;
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await axios.get(`${BASE_URL}/${id}`, config);
  return response.data;
});

export const updateUser = createAsyncThunk(
  "users/updateUsers",
  async (data) => {
    const { token, updateData, id } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    const response = await axios.patch(`${BASE_URL}/${id}`, updateData, config);
    return response.data;
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        usersAdapter.upsertOne(state, action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        usersAdapter.upsertOne(state, action.payload);
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        usersAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllUsers,
  selectIds: selectUserIds,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users);

export function selectUsersError(state) {
  return state.users.error;
}

export function selectUsersLoading(state) {
  return state.users.loading;
}

export const { clearUsersError } = usersSlice.actions;

export default usersSlice.reducer;
