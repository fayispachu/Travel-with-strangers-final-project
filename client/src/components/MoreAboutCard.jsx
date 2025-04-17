import React from "react";
import userProfile from "../assets/boy.png";
import tempplace from "../assets/tempplace.jpeg";
import closeicon from "../assets/close.png";
function MoreAboutCard({ oneTrip, closeMoreCard, handleClose }) {
  return (
    <>
      {" "}
      <div className="bg-gray-200/40 flex flex-col absolute   md:w-[100%] w-[100%] h-[100vh] md:h-[100vh] items-center justify-center top-0 left-0 ">
        <div className="bg-[#33D69F] relative  h-[100vh]  md:w-[40%] w-[100%] flex justify-center items-center ">
          {" "}
          <img
            onClick={() => {
              closeMoreCard();
              handleClose();
            }}
            className=" absolute top-4 right-4"
            src={closeicon}
            alt=""
          />
          <div className="md:w-96 w-[70%] bg-white md:h-[70vh] h-[55vh]  rounded-md drop-shadow-xl gap-3 flex flex-col md:p-6 md:px-5 px-3 py-4  ">
            <div className=" flex flex-row items-start gap-2">
              <img className="" src={userProfile} alt="" />
              <h1 className="font-bold text-lg">Fayiz.k</h1>
            </div>
            <img
              className="md:w-[100%]  md:h-36 h-32 rounded-md"
              src={oneTrip?.image || tempplace}
              alt="trip"
            />

            <div className="  overflow-hidden flex flex-col items-start gap-2  ">
              <div className="flex flex-row justify-between w-[100%]">
                {" "}
                <h1 className="font-bold md:text-lg ">
                  {oneTrip?.place || "choose place"}
                </h1>{" "}
                <button className="bg-[#33D69F]  rounded-md   px-5 py-2  text-white font-semibold border border-[#33D69F] ">
                  Join
                </button>
              </div>
              <p className="">{oneTrip?.details || "choose trip"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoreAboutCard;
