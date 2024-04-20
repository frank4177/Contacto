import React from "react";

import AddEditContactsButton from "@/components/Buttons/Add_Edit_Contacts";

import { IoIosHome } from "react-icons/io";
import { LuPlus } from "react-icons/lu";

const HeaderComponent = () => {
  const modalTitle = "Add Contacts";
  const modalSubTitle = "To add contacts, please enter the following:";
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-3">
        <div className="flex flex-row items-center gap-1">
          <IoIosHome size={23} />

          <span>Contacts</span>
        </div>
        |<span>Locations</span>
      </div>

      <AddEditContactsButton
        icon={<LuPlus size={27} color="black" />}
        title={modalTitle}
        subTitle={modalSubTitle}
      />
    </div>
  );
};

export default HeaderComponent;
