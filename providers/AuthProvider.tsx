"use client"

import { RootState } from '@/services/redux/store';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux';

interface IAuthProvider {
    children: ReactNode;
  }

const AuthProvider = ({children}: IAuthProvider) => {
    const router = useRouter()
    const auth = useSelector(
        (state: RootState) => state?.user?.userAuth
      );

      console.log(auth)

      if (auth) {
        return (
            <div>
                {children}
            </div>
          )
      }else {
        router.push("/")
      }
  
}

export default AuthProvider