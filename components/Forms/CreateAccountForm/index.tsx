"use client";

import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication, usersRef } from "@/configs/firebase";
import Swal from "sweetalert2";
import { Timestamp, addDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Spinner from "@/components/Loaders/Spinner";
import { useRouter } from "next/navigation";
import {toast, ToastPosition } from 'react-toastify';
import { useDispatch } from "react-redux";
import { userAuth } from "@/services/redux/features/userSlice";

const CreateAccountForm = () => {
  const dispatch = useDispatch()
const router = useRouter()
  const [loading, setLoading] = useState(false);


  const schema = yup
    .object({
      account_name: yup.string().required("This field is required."),
      account_phone: yup.string().required(),
      account_email: yup.string().required().email(),
      account_number: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { account_email: string; account_phone: string; account_name: string; account_number: string }) => {
    setLoading(true)
    // console.log(data);
   
      try {
        const res = await createUserWithEmailAndPassword(
          authentication,
          data.account_email,
          data.account_number + "123456"
        );

        // toast.success
        const uid = res.user.uid;
        const dataa = {
          id: uid,
          phone: data.account_phone,
          name: data.account_name,
          createdAt: Timestamp.now(),
        };
        let doc = await addDoc(usersRef, dataa);
        setLoading(false)
        console.log(doc);

        if (doc) {
          dispatch(userAuth(doc?.type))
          Swal.fire({
            title: "Success",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Login",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/dashboard")
  
            }
          });
        }

        
      } catch (error: any) {
        console.log(error.code)
        if (error.code === "auth/email-already-in-use") {
          toast.error<any>("Email already exist", {
            position: "top-right",
          });
        }
        if (error.code === "auth/network-request-failed") {
          toast.error("Network error", {
            position: "top-right",
          });
        }
        setLoading(false)
      }

  };

  return (
    <>
      <form
        className="  h-[100%]  max-w-[440px] w-full mt-[110px] space-y-3 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-1">
          <span className="font-bold text-[24px]">Create Account</span>
          <span className="text-[#87bbf7]">ACC-1001</span>
        </div>

        <div className="flex flex-row items-center gap-5 justify-between  max-w-[450px] w-full  ">
          <div className="flex flex-row items-center gap-1 ">
            <TextFieldsIcon />
            <span>Name</span>
          </div>
          <div className="w-full flex flex-col max-w-[330px]">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              type="text"
              {...register("account_name")}
              sx={{
                // maxWidth: 330,
                width: "100%",
              }}
            />
            <span className="text-red-500 text-[13px]">
              {errors.account_name?.message}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-5 justify-between  max-w-[450px] w-full ">
          <div className="flex flex-row items-center gap-1 ">
            <LocalPhoneIcon />
            <span>Phone</span>
          </div>
          <div className="w-full flex flex-col max-w-[330px]">
          <TextField
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            type="text"
            {...register("account_phone")}
            sx={{
              maxWidth: 330,
              width: "100%",
            }}
          />
          <span className="text-red-500 text-[13px]">
              {errors.account_phone?.message}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between  max-w-[450px] w-full ">
          <div className="flex flex-row items-center gap-1 ">
            <EmailOutlinedIcon />
            <span>Email</span>
          </div>
          <div className="w-full flex flex-col max-w-[330px]">
          <TextField
            id="outlined-basic"
            type="email"
            label="Email"
            variant="outlined"
            {...register("account_email")}
            sx={{
              maxWidth: 330,
              width: "100%",
            }}
          />
          <span className="text-red-500 text-[13px]">
              {errors.account_email?.message}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between  max-w-[450px] w-full  ">
          <div className="flex flex-row items-center gap-1 ">
            <CalculateOutlinedIcon />
            <span>Number</span>
          </div>
          <div className="w-full flex flex-col max-w-[330px]">
          <TextField
            id="outlined-basic"
            type="text"
            label="Number"
            variant="outlined"
            {...register("account_number")}
            sx={{
              maxWidth: 330,
              width: "100%",
            }}
          />
          <span className="text-red-500 text-[13px]">
              {errors.account_number?.message}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center self-end gap-2">
          <Button
            variant="contained"
            sx={{
              maxWidth: 110,
              width: "100%",
              backgroundColor: "red",
              ":hover": {
                backgroundColor: "red",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            // disabled
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              maxWidth: 110,
              width: "100%",
            }}
            className="flex flex-row items-center gap-2"
          >
            {loading &&<Spinner/>}
            <span>Save</span>
            
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateAccountForm;
