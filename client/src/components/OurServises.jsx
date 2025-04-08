import React from "react";

function OurServises() {
  return (
    <>
      <div className="bg-gray-100 py-28 flex flex-col  items-center  h-full">
        <h1 className="pb-16 font-bold md:text-3xl text-2xl font-[Poppins]">
          Our Services
        </h1>
        <div className=" flex md:flex-row  flex-col items-center justify-center md:pl-0   md:gap-36 gap-5  ">
          <div
            id="first"
            className="bg-white drop-shadow-md w-72 h-36 rounded-md  "
          >
            <h1>Hello</h1>
          </div>
          <div
            id="second"
            className="bg-white drop-shadow-md w-72 h-36 rounded-md "
          >
            <h1>Hello</h1>
          </div>
          <div
            id="third"
            className="bg-white drop-shadow-md w-72 h-36 rounded-md "
          >
            <h1>Hello</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurServises;
