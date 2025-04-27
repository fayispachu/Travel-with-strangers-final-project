import React from "react";
import rightarrow from "../assets/rightarrow.png";
import tempplace from "../assets/tempplace.jpeg";
function YourSaved() {
  return (
    <>
      {" "}
        <div className="w-full h-24 max-w-md flex items-center gap-4 p-2  bg-white rounded-md    cursor-pointer hover:shadow-lg transition-shadow duration-200">
          <img className="h-20 w-28  rounded-md" src={tempplace} alt="Trip" />
          <div className="flex-1 p-2 flex flex-col gap-1 overflow-hidden">
            <p className="text-xs text-gray-500">Date</p>
            <h1 className="text-sm md:text-md font-bold truncate">Place</h1>
            <p className="text-sm text-gray-700 line-clamp-2">Details</p>
          </div>
          <img className="w-4 h-4 md:w-6 md:h-6" src={rightarrow} alt=">" />
        </div>
    </>
  );
}

export default YourSaved;
