import React, { useContext, useEffect } from "react";
import { TripContext } from "../context/TripContext";
import rightarrow from "../assets/rightarrow.png";

function YourSaved() {
  const { saveTrip, handleGetSavedTrips } = useContext(TripContext);

  useEffect(() => {
    handleGetSavedTrips();
  }, []);

  return (
    <div className="p-4">
      {saveTrip.length === 0 ? (
        <p className="text-center text-white">No saved trips</p>
      ) : (
        saveTrip.map((trip) => (
          <div
            key={trip._id}
            className="w-full h-24 max-w-md flex items-center gap-4 p-2 bg-white rounded-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <img
              className="h-20 w-28 rounded-md object-cover"
              src={trip.image}
              alt="Trip"
            />
            <div className="flex-1 p-2 flex flex-col gap-1 overflow-hidden">
              <p className="text-xs text-gray-500">{trip.date}</p>
              <h1 className="text-sm md:text-md font-bold truncate">
                {trip.place}
              </h1>
              <p className="text-sm text-gray-700 line-clamp-2">
                {trip.details}
              </p>
            </div>
            <img className="w-4 h-4 md:w-6 md:h-6" src={rightarrow} alt=">" />
          </div>
        ))
      )}
    </div>
  );
}

export default YourSaved;
