import  { useEffect, useState } from "react";
import {getDocs,collection, orderBy, query } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { db } from "@/configs/firebase";
import { ContactsType } from "@/types";
import { contactsState } from "../redux/features/userSlice";

export const usefetchContacts = () =>{
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [contactsData, setContactsData] = useState<ContactsType[] | null>(null);
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(query(collection(db, "contacts"), orderBy("createdAt", "desc")));
        let data: any = [];
        querySnapshot.forEach((doc) => {
          const dat = doc.data();
          data.push(dat);
        });
       console.log(data)
        dispatch(contactsState(data));
        setContactsData(data);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
        console.error(error);
      }
    };

    

    return {contactsData, refetch: fetchContacts, loading}
}