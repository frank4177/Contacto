import { configureStore } from "@reduxjs/toolkit";
import contactsSlice from "./features/userSlice";


export const store = configureStore({
  reducer: {
    contactsData: contactsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
