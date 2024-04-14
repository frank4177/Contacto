"use client";

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ModalDialog from "@/components/Dialog";
import { toast } from "react-toastify";
import { Timestamp, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { contactsCollectionRef, db } from "@/configs/firebase";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Spinner from "@/components/Loaders/Spinner";
import { ContactsType } from "@/types";
import { usefetchContacts } from "@/services/api_requests";

interface IAddEditContactsButtonProps {
  icon?: React.JSX.Element;
  title?: string;
  subTitle?: string;
  edit?: boolean;
  data?: ContactsType;
}

export default function AddEditContactsButton({
  icon,
  title,
  edit,
  data,
}: IAddEditContactsButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refetch, loading: isRefetching } = usefetchContacts();

  const defaultName = data?.name ? data?.name : "";
  const defaultJobTitle = data?.job_title ? data?.job_title : "";
  const defaultId = data?.id ? data?.id : "";

  const schema = yup
    .object({
      name: yup.string().required("This field is required."),
      job_title: yup.string().required("This field is required."),
      department: yup.string().required("This field is required."),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      department: "New tag",
      name: defaultName,
      job_title: defaultJobTitle,
    },
  });

  useEffect(() => {
    reset({
      name: defaultName,
      job_title: defaultJobTitle,
      department: "New Tag",
    });
  }, [defaultName, defaultJobTitle, reset]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Add contacts function
  const handleAddContact = async (data: ContactsType) => {
    const payloadData = {
      id: uuidv4(),
      name: data.name,
      job_title: data.job_title,
      department: data.department,
      updatedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    };

    const contactsRef = doc(contactsCollectionRef, payloadData.id);

    try {
      setLoading(true);
      let doc = await setDoc(contactsRef, payloadData);
      setLoading(false);
      toast.success("Contact added succesfully.", {
        position: "top-right",
      });
      handleClose();
      refetch();
      reset({
        name: "",
        job_title: "",
        department: "New Tag",
      });
      console.log(doc);
    } catch (error: any) {
      setLoading(false);
      console.log(error?.code);
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
    } finally {
      setLoading(false);
    }
  };

  // Edit contacts function
  const handleEditContact = async (data: ContactsType, id?: string) => {
    const idd = id ? id : "";
    const updateContactsRef = doc(contactsCollectionRef, idd);
    const payloadData = {
      name: data.name,
      job_title: data.job_title,
      updatedAt: Timestamp.now(),
    };
    try {
      setLoading(true);
      let doc = await updateDoc(updateContactsRef, payloadData);
      setLoading(false);
      toast.success("Contact updated succesfully.", {
        position: "top-right",
      });
      handleClose();
      refetch();
    } catch (error: any) {
      console.log(error.code);
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  //Submit Condition
  const onSubmit = async (formdata: ContactsType) => {
    if (edit) {
      handleEditContact(formdata, defaultId);
    } else {
      handleAddContact(formdata);
    }
  };

  return (
    <div>
      <Button className="text-black" onClick={handleClickOpen}>
        {icon}
      </Button>
      <ModalDialog
        open={open}
        onClose={handleClose}
        handleClickOpen={handleClickOpen}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[600px]"
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add contacts, please enter the following:
            </DialogContentText>
            <div className="w-full max-w-[300px]">
              <TextField
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                {...register("name")}
              />
              <span className="text-red-500 text-[13px]">
                {errors.name?.message}
              </span>
            </div>

            <div className="w-full max-w-[300px]">
              <TextField
                margin="dense"
                id="name"
                label="Job Title"
                type="text"
                fullWidth
                {...register("job_title")}
              />
              <span className="text-red-500 text-[13px]">
                {errors.job_title?.message}
              </span>
            </div>

            <div className="w-full max-w-[300px]">
              <TextField
                disabled
                margin="dense"
                id="name"
                label="Department"
                type="text"
                fullWidth
                {...register("department")}
                // defaultValue="New tag"
              />
              <span className="text-red-500 text-[13px]">
                {errors.department?.message}
              </span>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              {loading && <Spinner />}
              <span>Submit</span>
            </Button>
          </DialogActions>
        </form>
      </ModalDialog>
    </div>
  );
}
