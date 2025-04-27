import React from "react";
import AgencieSearch from "./AgencieSearch";
import UserSearch from "./UserSearch";

function UserSection() {

  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen  bg-gray-50 py-10 px-4">
       
        <div className="flex flex-row justify-between w-[100%]">
          {" "}
          <UserSearch /> <AgencieSearch />
        </div>
      </div>
    </>
  );
}

export default UserSection;
