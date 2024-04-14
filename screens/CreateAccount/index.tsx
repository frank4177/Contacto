import CreateAccountForm from "@/components/Forms/CreateAccountForm";
import React from "react";

const CreateAccountScreen = () => {
  return (
    <div className="max-w-[1200px] m-auto min-h-screen flex flex-col px-[5%]">
    {/* <div className="self-end">
        <span>Login</span>
    </div> */}
    <div className="w-full flex flex-col  items-center">
    <CreateAccountForm />

    </div>
    </div>
  );
};

export default CreateAccountScreen;
