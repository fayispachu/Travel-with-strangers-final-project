import React, { useContext } from "react";

import settingline from "../assets/settingline.png";
// import mapimage from "../assets/mapimage.png";
import CreatePopup from "../components/CreatePopup";
import Tripbar from "./Tripbar";
import Card from "./Card";
import { TripContext } from "../context/TripContext";

function LatestTrips() {
  const { setSearchTerm } = useContext(TripContext);
  return (
    <>
      <div className="flex  overflow-hidden   flex-col w-[100%]  h-[100vh] pt-10 pb-16  gap-14 px-5 md:px-32 relative">
        {/* <img className="" src={mapimage} alt="" /> */}
        <div className="flex flex-col items-center">
          {" "}
          <h1 className="font-bold md:text-3xl text-2xl font-[Poppins] pb-10">
            Latest trips
          </h1>{" "}
          <div className="flex flex-row    ">
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
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
          <CreatePopup />
          <div className="flex">
            <Tripbar /> <Card />
          </div>
        </div>
      </div>
    </>
  );
}

export default LatestTrips;
