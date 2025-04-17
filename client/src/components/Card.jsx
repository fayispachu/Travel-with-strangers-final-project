import React, { useContext, useState } from "react";
// import userProfile from "../assets/boy.png";
import tempplace from "../assets/tempplace.jpeg";
import closeicon from "../assets/close.png";
import MoreAboutCard from "./MoreAboutCard";
import { TripContext } from "../context/TripContext";
function Card() {
  const [showMoreCard, setShowMoreCard] = useState(false);

  const { oneTrip, handleClose, isOpen } = useContext(TripContext);
  const openMoreCard = () => {
    setShowMoreCard(true);
  };
  const closeMoreCard = () => {
    setShowMoreCard(false);
  };

  if (!oneTrip)
    return <h1 className="text-center">Loading trip not getting</h1>;

  return (
    <>
      {isOpen && (
        <div className="md:bg-white flex flex-col absolute bg-gray-200 md:w-[50%] w-[100%] h-[100vh] md:h-[60vh] items-center justify-center  md:left-[50%] md:right-12 md:top-56 top-0 left-0 ">
          <img
            onClick={handleClose}
            className="md:hidden absolute top-4 right-4"
            src={closeicon}
            alt=""
          />
          <div
            onClick={openMoreCard}
            className="md:w-96 w-[70%] bg-white md:h-[60vh] h-[55vh]  rounded-md drop-shadow-xl gap-3 flex flex-col md:p-6 md:px-5 px-3 py-4  "
          >
            <div className=" flex flex-row items-start gap-2">
              <img className="" src={oneTrip.profile} alt="" />
              <h1 className="font-bold text-lg">{oneTrip.name}</h1>
            </div>
            <img
              className="md:w-[100%]  md:h-36 h-32 rounded-md"
              src={oneTrip?.image || tempplace}
              alt="trip"
            />
            <div className="flex flex-col items-start gap-2 ">
              <h1 className="font-bold md:text-lg ">
                {oneTrip?.place || "choose place"}
              </h1>
              <p className="">{oneTrip?.details || "choose trip"}</p>
            </div>
          </div>
        </div>
      )}

      {showMoreCard && (
        <MoreAboutCard
          oneTrip={oneTrip}
          closeMoreCard={closeMoreCard}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default Card;
