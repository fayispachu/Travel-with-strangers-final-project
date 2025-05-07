import React, { useContext, useState } from "react";
import tempplace from "../assets/tempplace.jpeg";
import MoreAboutCard from "./MoreAboutCard";
import { TripContext } from "../context/TripContext";

function Card() {
  const [showMoreCard, setShowMoreCard] = useState(false);
  const { oneTrip, handleClose, isOpen } = useContext(TripContext);

  const openMoreCard = () => setShowMoreCard(true);
  const closeMoreCard = () => setShowMoreCard(false);

  if (!oneTrip)
    return <h1 className="text-center text-white">Loading trip...</h1>;

  return (
    <>
      {isOpen && (
        <div
          onClick={openMoreCard}
          className="bg-white relative text-black rounded-2xl w-full md:w-[35%]  min-h-[56vh] flex flex-col gap-4 drop-shadow-2xl transition-all    z-30  top-3 right-0  bg-opacity-80  "
        >
         
          <div className="flex items-center absolute top-3 right-2 z-50  gap-4">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={oneTrip.profile || "profile"}
              alt="User"
            />
            {/* <h1 className="font-bold text-xl">{oneTrip.name}</h1> */}
          </div>
          <img
            className="w-full h-[30vh] md:h-[30vh] object-cover rounded-t-xl"
            src={oneTrip?.image || tempplace}
            alt="trip"
          />
          <div className="flex flex-col gap-2 px-5">
            <h1 className="font-semibold text-lg">
              {oneTrip?.place || "Unknown Location"}
            </h1>
            <p className="text-gray-300">
              {oneTrip?.details || "No trip details available."}
            </p>
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
