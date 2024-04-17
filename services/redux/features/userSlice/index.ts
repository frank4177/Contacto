
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxUserTypes } from "./types";
import { ContactsType } from "@/types";


const initialState: ReduxUserTypes = {
  contacts: null,
  userAuth: ""
};

const userSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    userAuth: (state, action: PayloadAction<string>) => {
      state.userAuth = action.payload;
    },
    contactsState: (state, action: PayloadAction<ContactsType[]>) => {
      state.contacts = action.payload;
    }
  },
});

export const { contactsState, userAuth } =
userSlice.actions;
export default userSlice.reducer;
