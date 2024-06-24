import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

const contactsAdapter = createEntityAdapter();

const initialState = contactsAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getAllContacts = createAsyncThunk("getAllContacts", async () => {
  /* const consfig = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  }; */
  const response = await axios.get(BASE_URL);
  console.log("CONT", response.data);
  return response.data;
});

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        contactsAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllContacts,
  selectIds: selectContactsIds,
  selectById: selectContactById,
} = contactsAdapter.getSelectors((state) => state.contacts);

export function selectContactsLoading(state) {
  return state.contacts.loading;
}

export default contactsSlice.reducer;
