import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HomeIcon from "@mui/icons-material/Home";
import AddEditContactsButton from "@/components/Buttons/Add_Edit_Contacts";
import { NoSsr } from "@mui/material";

const HeaderComponent = () => {
  const modalTitle = "Add Contacts";
  const modalSubTitle = "To add contacts, please enter the following:";
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-3">
        <div className="flex flex-row items-center gap-1">
          <NoSsr>
            <HomeIcon />
          </NoSsr>

          <span>Contacts</span>
        </div>
        |<span>Locations</span>
      </div>

      <AddEditContactsButton
        icon={
          <NoSsr>
            <AddOutlinedIcon />
          </NoSsr>
        }
        title={modalTitle}
        subTitle={modalSubTitle}
      />
    </div>
  );
};

export default HeaderComponent;
