import React from "react";
import tempPlace from "../assets/tempplace.jpeg";

function MostVisitedPlace() {
  return (
    <>
      <div
        id="mostvisited"
        className="flex overflow-hidden flex-col w-[100%] md:h-screen  h-full items-center justify-center bg-[#c2f8e6] "
      >
        {" "}
        <h1 className="font-bold text-2xl ">Most Visited Places</h1>{" "}
        <div className="flex  flex-col md:flex-row  md:gap-16 gap-5  py-14  items-center justify-center  ">
          {" "}
          <div className="md:w-72  md:h-[60vh] w-[95%] h-[20vh]  gap-5 flex md:flex-col flex-row items-center rounded-md drop-shadow-lg  bg-white  ">
            <img
              className="md:w-full md:h-[30vh] h-full w-[40%] md:rounded-t-md "
              src={tempPlace}
              alt=""
            />
            <div className="flex items-start flex-col py-5 px-2">
              {" "}
              <h1 className="font-bold text-md">Kashmir</h1>
              <p>10/20/25 to 20/20/25</p>
              <p>
                Exploring Srinagar, Gulmarg, Pahalgam & Sonmarg—snowy peaks,
                lakes & adventure!
              </p>
            </div>
          </div>
          <div className="md:w-72  md:h-[60vh] w-[95%] h-[20vh] gap-5 flex md:flex-col flex-row items-center rounded-md drop-shadow-lg  bg-white  ">
            <img
              className="md:w-full md:h-[30vh] h-full w-[40%] md:rounded-t-md "
              src={tempPlace}
              alt=""
            />
            <div className="flex items-start flex-col  py-10 px-2">
              {" "}
              <h1 className="font-bold text-md">Kashmir</h1>
              <p>10/20/25 to 20/20/25</p>
              <p>
                Exploring Srinagar, Gulmarg, Pahalgam & Sonmarg—snowy peaks,
                lakes & adventure!
              </p>
            </div>
          </div>
          <div className="md:w-72  md:h-[60vh] w-[95%] h-[20vh]  gap-5 flex md:flex-col flex-row items-center rounded-md drop-shadow-lg  bg-white">
            <img
              className="md:w-full md:h-[30vh] h-full w-[40%] md:rounded-t-md "
              src={tempPlace}
              alt=""
            />
            <div className="flex items-start flex-col  py-10 px-2">
              {" "}
              <h1 className="font-bold text-md">Kashmir</h1>
              <p>10/20/25 to 20/20/25</p>
              <p>
                Exploring Srinagar, Gulmarg, Pahalgam & Sonmarg—snowy peaks,
                lakes & adventure!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MostVisitedPlace;
