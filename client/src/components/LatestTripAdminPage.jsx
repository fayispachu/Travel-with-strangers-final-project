import React from "react";

function LatestTripAdminPage() {
  return (
    <>
      <div className="bg-white  w-[90%] h-[70vh] ml-16 px-7">
        <div className="flex flex-row  justify-between items-center px-5  py-3 ">
          <h1 className="font-bold text-xl  ">Recent trips</h1>
          <div className="flex flex-row items-center">
            {" "}
            <input
              type="text"
              className="bg-gray-100 rounded-full py-2 px-4"
              placeholder="Search....."
            />
            <button className="bg-[#33D69F] px-5  py-2 ml-5 rounded-md">
              View all
            </button>
          </div>
        </div>
        {/* for identify name duration */}
        <div className="flex flex-row items-center justify-between py-2 bg-gray-100 px-10">
          <h1>Name</h1>
          <h1 className="">Creator name</h1>
          <h1>Duration</h1>
          <h1>Number of peoples</h1>
        </div>
        {/* user details show */}
        <div className="flex flex-row items-center py-2 justify-between px-10">
          <h1>Kashmir</h1>
          <h1 className="">Fayiz.k</h1>
          <h1 className="">1/1/2025 to 2/2/2025</h1>
          <h1 className="ml-5">10</h1>
        </div>
        <div className="border-t border-gray-300 mb-1"></div>
        {/* user show 2 */}
        <div className="flex flex-row items-center py-2 justify-between px-10">
          <h1>Kashmir</h1>
          <h1 className="">Fayiz.k</h1>
          <h1 className="">1/1/2025 to 2/2/2025</h1>
          <h1 className="ml-5">10</h1>
        </div>
        <div className="border-t border-gray-300 mb-1"></div>
        {/* user show 3 */}
        <div className="flex flex-row items-center py-2 justify-between px-10">
          <h1>Kashmir</h1>
          <h1 className="">Fayiz.k</h1>
          <h1 className="">1/1/2025 to 2/2/2025</h1>
          <h1 className="ml-5">10</h1>
        </div>
        <div className="border-t border-gray-300 mb-1"></div>
        {/* user show 4 */}
        <div className="flex flex-row items-center py-2 justify-between px-10">
          <h1>Kashmir</h1>
          <h1 className="">Fayiz.k</h1>
          <h1 className="">1/1/2025 to 2/2/2025</h1>
          <h1 className="ml-5">10</h1>
        </div>
        <div className="border-t border-gray-300 mb-1"></div>
        {/* user show 5 */}
        <div className="flex flex-row items-center py-2 justify-between px-10">
          <h1>Kashmir</h1>
          <h1 className="">Fayiz.k</h1>
          <h1 className="">1/1/2025 to 2/2/2025</h1>
          <h1 className="ml-5">10</h1>
        </div>
        <div className="border-t border-gray-300 mb-1"></div>
        {/* user show 6 */}
        <div className="flex flex-row items-center py-2 justify-between px-10">
          <h1>Kashmir</h1>
          <h1 className="">Fayiz.k</h1>
          <h1 className="">1/1/2025 to 2/2/2025</h1>
          <h1 className="ml-5">10</h1>
        </div>
        <div className="border-t border-gray-300 mb-1"></div>
        {/* user show 7 */}
        <div className="flex flex-row items-center py-2 justify-between px-10">
          <h1>Kashmir</h1>
          <h1 className="">Fayiz.k</h1>
          <h1 className="">1/1/2025 to 2/2/2025</h1>
          <h1 className="ml-5">10</h1>
        </div>
        <div className="border-t border-gray-300 mb-1"></div>
      </div>
    </>
  );
}

export default LatestTripAdminPage;
