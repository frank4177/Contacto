"use client";

import { RootState } from "@/services/redux/store";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

interface IAuthProvider {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProvider) => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state?.user?.userAuth);

  // if (auth) {
  //   return <div>{children}</div>;
  // } else {
  // router.push("/")
  //   return <></>
  // }

  useEffect(() => {
    if (!auth) {
      router.push("/");
    }
  }, [auth]);

  if (auth) return <>{children}</>;
};

export default AuthProvider;
