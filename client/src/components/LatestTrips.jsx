import React, { useState } from "react";
import userProfile from "../assets/boy.png";
import tempPlace from "../assets/tempplace.jpeg";
import Tripbar from "./Tripbar";
import Card from "./Card";
import settingline from "../assets/settingline.png";
// import mapimage from "../assets/mapimage.png";
function LatestTrips() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }
  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex  overflow-hidden   flex-col w-[100%]  h-full pt-10 pb-16  gap-14 px-5 md:px-32 relative">
        {/* <img className="" src={mapimage} alt="" /> */}
        <div className="flex flex-col items-center">
          {" "}
          <h1 className="font-bold md:text-3xl text-2xl font-[Poppins] pb-10">
            Latest trips
          </h1>{" "}
          <div className="flex flex-row    ">
            <input
              type="text"
              className="bg-gray-100 rounded-md md:h-12 py-2  px-3 md:px-14"
              placeholder="Search....."
            />{" "}
            <button className="bg-[#33D69F] md:px-6 px-4  md:h-12  py-2 ml-5 rounded-md">
              <img src={settingline} alt="" />
            </button>
          </div>
        </div>
        <div className="md:gap-56 gap-10  flex md:flex-row flex-col ">
          {" "}
          <Tripbar handleOpen={handleOpen} />
          {isOpen && (
            <div className="flex items-center justify-center  bg-gray-50 w-[95%] p-5 h-[70vh] rounded-md md:hidden absolute left-2.5 top-5 ">
              <img
                onClick={handleClose}
                className="bg-black absolute top-5 right-5"
                src={settingline}
                alt=""
              />
              <div className="md:w-96 w-[90%] md:h-[60vh]   bg-white rounded-md drop-shadow-xl gap-3 flex flex-col md:p-6 px-5 py-4   ">
                <div className=" flex flex-row items-start gap-2">
                  <img
                    onClick={handleClose}
                    className=""
                    src={userProfile}
                    alt=""
                  />
                  <h1 className="font-bold text-lg">Fayiz.k</h1>
                </div>
                <img
                  className="md:w-[100%]  md:h-36 h-24 rounded-md"
                  src={tempPlace}
                  alt=""
                />
                <div className="flex flex-col items-start gap-2 ">
                  <h1 className="font-bold md:text-lg ">Kashmir</h1>
                  <p className="">
                    Exploring Srinagar, Gulmarg, Pahalgam & Sonmarg—snowy peaks,
                    lakes & adventure!
                  </p>
                  <p>📅 5-7 Days | ₹20,000 – ₹50,000 per person</p>
                  <p>Anyone Interested?✨</p>
                </div>
              </div>
            </div>
          )}
          <Card hidden isOpen={isOpen} handleClose={handleClose} />
        </div>
      </div>
    </>
  );
}

export default LatestTrips;
