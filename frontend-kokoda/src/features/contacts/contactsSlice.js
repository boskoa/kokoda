import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/contacts";

const contactsAdapter = createEntityAdapter();

const initialState = contactsAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getAllContacts = createAsyncThunk(
  "contacts/getAllContacts",
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

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    clearContacts: () => initialState,
    removeContact: (state, action) => {
      contactsAdapter.removeOne(state, action.payload);
    },
  },
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

export const { clearContacts, removeContact } = contactsSlice.actions;

export default contactsSlice.reducer;
