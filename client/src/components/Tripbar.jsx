import React, { useContext } from "react";
import rightarrow from "../assets/rightarrow.png";
import tempplace from "../assets/tempplace.jpeg";
import { TripContext } from "../context/TripContext";

function Tripbar() {
  const { trips, handleOneTrip, handleOpen, searchTerm } =
    useContext(TripContext);

  return (
    <>
      {trips.length === 0 && (
        <p className="text-center text-red-800 font-bold">
          No trips found for "{searchTerm}"
        </p>
      )}

      <div className="flex  flex-col items-center md:items-start rounded-md md:ml-10 bg-white overflow-y-auto scrollbar-hidden p-2 h-[33vh] md:h-[60vh]">
        {trips.map((trip, index) => (
          <div
            key={index}
            onClick={async () => {
              await handleOneTrip(trip._id);
              handleOpen();
            }}
            className="w-full h-24 max-w-md flex items-center gap-4 p-2  bg-white rounded-md    cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <img
              className="h-20 w-28  rounded-md"
              src={trip?.image || tempplace}
              alt="Trip"
            />
            <div className="flex-1 p-2 flex flex-col gap-1 overflow-hidden">
              <p className="text-xs text-gray-500">{trip?.date}</p>
              <h1 className="text-sm md:text-md font-bold truncate">
                {trip?.place}
              </h1>
              <p className="text-sm text-gray-700 line-clamp-2">
                {trip?.details}
              </p>
            </div>
            <img className="w-4 h-4 md:w-6 md:h-6" src={rightarrow} alt=">" />
          </div>
        ))}
      </div>
    </>
  );
}

export default Tripbar;
