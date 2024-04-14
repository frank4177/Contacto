import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToasterWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  );
};

export default ToasterWrapper;
