import React from "react";
import userProfile from "../assets/boy.png";

import tempplace from "../assets/tempplace.jpeg";
function Joinedtrip() {
  return (
    <>
      <div className="md:flex hidden  bg-gray-50 h-[60vh]   justify-center gap-7  w-[100%] py-20 ">
        <div className=" w-[20%] bg-white h-[37vh]  rounded-md drop-shadow-xl gap-3 flex flex-col py-3 px-2   ">
          <div className=" flex flex-row items-center gap-2">
            <img className="w-5" src={userProfile} alt="" />
            <h1 className="font-bold text-md">Fayiz.k</h1>
          </div>
          <img
            className="w-[100%]  h-20 rounded-sm"
            // src={trip?.image}
            src={tempplace}
            alt="trip"
          />
          <div className="flex flex-col items-start gap-2 ">
            <h1 className="font-bold md:text-md ">Kashmir</h1>
            <p className="">augbajdsbcadk</p>
          </div>
        </div>
        <div className=" w-[20%] bg-white h-[37vh]  rounded-md drop-shadow-xl gap-3 flex flex-col py-3 px-2   ">
          <div className=" flex flex-row items-center gap-2">
            <img className="w-5" src={userProfile} alt="" />
            <h1 className="font-bold text-md">Fayiz.k</h1>
          </div>
          <img
            className="w-[100%]  h-20 rounded-sm"
            // src={trip?.image}
            src={tempplace}
            alt="trip"
          />
          <div className="flex flex-col items-start gap-2 ">
            <h1 className="font-bold md:text-md ">Kashmir</h1>
            <p className="">augbajdsbcadk</p>
          </div>
        </div>
        <div className=" w-[20%] bg-white h-[37vh]  rounded-md drop-shadow-xl gap-3 flex flex-col py-3 px-2   ">
          <div className=" flex flex-row items-center gap-2">
            <img className="w-5" src={userProfile} alt="" />
            <h1 className="font-bold text-md">Fayiz.k</h1>
          </div>
          <img
            className="w-[100%]  h-20 rounded-sm"
            // src={trip?.image}
            src={tempplace}
            alt="trip"
          />
          <div className="flex flex-col items-start gap-2 ">
            <h1 className="font-bold md:text-md ">Kashmir</h1>
            <p className="">augbajdsbcadk</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Joinedtrip;
