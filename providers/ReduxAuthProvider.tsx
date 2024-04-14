"use client"

import { store } from "@/services/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

interface IReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider = ({ children }: IReduxProviderProps) => {
  return (

      <Provider store={store}>{children}</Provider>

  );
};

export default ReduxProvider;
