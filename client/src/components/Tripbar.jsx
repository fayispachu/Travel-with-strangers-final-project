import React, { useContext } from "react";
import rightarrow from "../assets/rightarrow.png";
import tempplace from "../assets/tempplace.jpeg";
import { TripContext } from "../context/TripContext";

function Tripbar() {
  const { trips, handleOneTrip, handleOpen, searchTerm, filteredTrip } =
    useContext(TripContext);
  return (
    <>
      {trips.length === 0 && (
        <p className="font-bolt text-red-800">No trips found"{searchTerm}"</p>
      )}

      <div className="flex flex-col md:items-start items-center md:gap-6 md:ml-10 gap-3 overflow-y-scroll overflow-x-hidden md:p-2 p-1 md:h-[60vh]  h-[33vh]">
        {filteredTrip.map((trips, index) => (
          <div
            key={index}
            onClick={async () => {
              await handleOneTrip(trips._id), handleOpen();
            }}
            className=" md:w-96 w-[95%]  md:h-[15vh] md:gap-5 gap-3 flex flex-row items-center rounded-md drop-shadow-lg pr-4 bg-white "
          >
            <img
              className="w-[30%]  h-full rounded-l-md"
              src={trips?.image || tempplace}
              alt=""
            />{" "}
            <p>{trips?.date}</p>
            <h1 className="font-bold text-sm md:text-md">{trips?.place}</h1>
            <p>{trips?.details}</p>
            <img src={rightarrow} alt="" />
          </div>
        ))}
      </div>
    </>
  );
}

export default Tripbar;
