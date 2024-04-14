
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxUserTypes } from "./types";
import { ContactsType } from "@/types";


const initialState: ReduxUserTypes = {
  contacts: null
};

const contactsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    contactsState: (state, action: PayloadAction<ContactsType[]>) => {
      state.contacts = action.payload;
    }
  },
});

export const { contactsState } =
contactsSlice.actions;
export default contactsSlice.reducer;
