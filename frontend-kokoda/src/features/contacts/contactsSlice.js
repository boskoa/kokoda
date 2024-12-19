import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

const contactsAdapter = createEntityAdapter();

const initialState = contactsAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getAllContacts = createAsyncThunk(
  "contacts/getAllContacts",
  async (data) => {
    const { offset, limit } = data;
    /* const consfig = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  }; */
    //change query when quering db
    const response = await axios.get(
      BASE_URL + `?_start=${offset}&_limit=${limit}`,
    );
    return response.data;
  },
);

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
