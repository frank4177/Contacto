"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddEditContactsButton from "../Buttons/Add_Edit_Contacts";
import { useSelector } from "react-redux";
import { RootState } from "@/services/redux/store";
import { useEffect } from "react";
import { usefetchContacts } from "@/services/api_requests";
import FlatLoader from "../Loaders/flatLoader";
import NoData from "../NotFound/noData";
import Image from "next/image";

const ContactTable = () => {
  const modalTitle = "Edit Contacts";
  const modalSubTitle = "To edit contacts, please enter the following:";
  const contacts = useSelector(
    (state: RootState) => state?.contactsData?.contacts
  );
  const { refetch, loading: isFetching } = usefetchContacts();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <TableContainer component={Paper} className="grid">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Check</TableCell>
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">Job Title</TableCell>
              <TableCell className="tableCell">Department</TableCell>
              <TableCell className="tableCell">
                <div className="text-center">Icon </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts?.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell !font-normal">
                  <div>
                    <Checkbox />
                  </div>
                </TableCell>
                <TableCell className="tableCell !font-normal">
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src="https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg"
                      height={50}
                      width={50}
                      alt="user avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    {row.name}
                  </div>
                </TableCell>
                <TableCell className="tableCell !font-normal">
                  {row.job_title}
                </TableCell>
                <TableCell className="tableCell !font-normal">
                  <div className="bg-[#F5F4FB] text-[#9589D2]  w-fit px-2 py-1 rounded-lg">
                    {row.department}
                  </div>
                </TableCell>

                <TableCell className="tableCell !font-normal">
                  <div className="text-center">
                    <AddEditContactsButton
                      icon={<ModeEditOutlinedIcon />}
                      title={modalTitle}
                      subTitle={modalSubTitle}
                      edit={true}
                      data={row}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isFetching && <FlatLoader />}
      {contacts?.length === 0 && <NoData refetch={refetch} />}
    </>
  );
};

export default ContactTable;
