import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/login";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (credentials) => {
    const response = await axios.post(BASE_URL, credentials);
    window.localStorage.setItem("loggedKokoda", JSON.stringify(response.data));

    return response.data;
  },
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    alreadyLogged: (state, action) => {
      state.user = action.payload;
    },
    logout: () => {
      window.localStorage.removeItem("loggedKokoda");
      return initialState;
    },
    clearLoginError: (state) => {
      state.error = null;
    },
    updateLoggedUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export function selectLoggedUser(state) {
  return state.login.user;
}

export function selectLoggedError(state) {
  return state.login.error;
}

export const { alreadyLogged, logout, clearLoginError, updateLoggedUser } =
  loginSlice.actions;

export default loginSlice.reducer;
