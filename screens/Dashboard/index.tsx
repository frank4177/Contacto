import React from "react";
import ContactTable from "@/components/Table/ContactTable";
import HeaderComponent from "./HeaderComponent";

const DashboardScreen = () => {
  return (
    <>
      <div className="max-w-[1200px] m-auto min-h- pb-[30px] px-[5%] pt-[20px] flex flex-row ">
        <div className="h-[100%] w-full space-y-2">
          <HeaderComponent />
          <hr className="border-[1px] border-gray-200 " />
          <div className="mt-[50px]">
            <ContactTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardScreen;
