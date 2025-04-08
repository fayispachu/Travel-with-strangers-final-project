import React from "react";
import tempPlace from "../assets/tempplace.jpeg";

function MostVisitedPlace() {
  return (
    <>
      <div className="flex  md:flex-row flex-col md:gap-24 gap-5 w-[100%] md:h-screen  h-full py-24 items-center justify-center bg-[#c2f8e6] ">
        {" "}
        <div className="md:w-72  md:h-[60vh] w-[95%] h-[25vh] gap-5 flex md:flex-col flex-row items-center rounded-md drop-shadow-lg  bg-white  ">
          <img
            className="md:w-full md:h-[30vh] h-full w-[40%] md:rounded-t-md rounded-l-md"
            src={tempPlace}
            alt=""
          />
          <div className="flex items-start flex-col p-5">
            {" "}
            <h1 className="font-bold text-md">Kashmir</h1>
            <p>10/20/25 to 20/20/25</p>
            <p>
              Exploring Srinagar, Gulmarg, Pahalgam & Sonmarg—snowy peaks, lakes
              & adventure!
            </p>
          </div>
        </div>
        <div className="md:w-72  md:h-[60vh] w-[95%] h-[25vh] gap-5 flex md:flex-col flex-row items-center rounded-md drop-shadow-lg  bg-white  ">
          <img
            className="md:w-full md:h-[30vh] h-full w-[40%] md:rounded-t-md rounded-l-md"
            src={tempPlace}
            alt=""
          />
          <div className="flex items-start flex-col p-5">
            {" "}
            <h1 className="font-bold text-md">Kashmir</h1>
            <p>10/20/25 to 20/20/25</p>
            <p>
              Exploring Srinagar, Gulmarg, Pahalgam & Sonmarg—snowy peaks, lakes
              & adventure!
            </p>
          </div>
        </div>
        <div className="md:w-72  md:h-[60vh] w-[95%] h-[25vh]  gap-5 flex md:flex-col flex-row items-center rounded-md drop-shadow-lg  bg-white">
          <img
            className="md:w-full md:h-[30vh] h-full w-[40%] md:rounded-t-md rounded-l-md"
            src={tempPlace}
            alt=""
          />
          <div className="flex items-start flex-col p-5">
            {" "}
            <h1 className="font-bold text-md">Kashmir</h1>
            <p>10/20/25 to 20/20/25</p>
            <p>
              Exploring Srinagar, Gulmarg, Pahalgam & Sonmarg—snowy peaks, lakes
              & adventure!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MostVisitedPlace;
