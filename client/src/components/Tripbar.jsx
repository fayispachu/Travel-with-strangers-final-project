import React from "react";
import tempPlace from "../assets/tempplace.jpeg";
import rightarrow from "../assets/rightarrow.png";
function Tripbar({ handleOpen }) {
  return (
    <>
      <div className="flex flex-col md:items-start items-center md:gap-6 md:ml-10 gap-3 overflow-y-scroll md:p-2 p-1 md:h-[60vh]  h-[33vh]">
        {" "}
        <div
          onClick={handleOpen}
          className=" md:w-96 w-[95%]  md:h-[15vh] md:gap-5 gap-3 flex flex-row items-center rounded-md drop-shadow-lg pr-4 bg-white "
        >
          <img
            className="w-[30%]  h-full rounded-l-md"
            src={tempPlace}
            alt=""
          />
          <h1 className="font-bold text-sm md:text-md">Kashmir</h1>
          <p>10/20/25 to 20/20/25</p>
          <img src={rightarrow} alt="" />
        </div>
        <div
          onClick={handleOpen}
          className=" md:w-96 w-[95%]  md:h-[15vh] md:gap-5 gap-3 flex flex-row items-center rounded-md drop-shadow-lg pr-4 bg-white "
        >
          <img
            className="w-[30%]  h-full rounded-l-md"
            src={tempPlace}
            alt=""
          />
          <h1 className="font-bold text-sm md:text-md">Kashmir</h1>
          <p>10/20/25 to 20/20/25</p>
          <img src={rightarrow} alt="" />
        </div>
        <div
          onClick={handleOpen}
          className=" md:w-96 w-[95%]  md:h-[15vh] md:gap-5 gap-3 flex flex-row items-center rounded-md drop-shadow-lg pr-4 bg-white "
        >
          <img
            className="w-[30%]  h-full rounded-l-md"
            src={tempPlace}
            alt=""
          />
          <h1 className="font-bold text-sm md:text-md">Kashmir</h1>
          <p>10/20/25 to 20/20/25</p>
          <img src={rightarrow} alt="" />
        </div>
        <div
          onClick={handleOpen}
          className=" md:w-96 w-[95%]  md:h-[15vh] md:gap-5 gap-3 flex flex-row items-center rounded-md drop-shadow-lg pr-4 bg-white "
        >
          <img
            className="w-[30%]  h-full rounded-l-md"
            src={tempPlace}
            alt=""
          />
          <h1 className="font-bold text-sm md:text-md">Kashmir</h1>
          <p>10/20/25 to 20/20/25</p>
          <img src={rightarrow} alt="" />
        </div>
        <div
          onClick={handleOpen}
          className=" md:w-96 w-[95%]  md:h-[15vh] md:gap-5 gap-3 flex flex-row items-center rounded-md drop-shadow-lg pr-4 bg-white "
        >
          <img
            className="w-[30%]  h-full rounded-l-md"
            src={tempPlace}
            alt=""
          />
          <h1 className="font-bold text-sm md:text-md">Kashmir</h1>
          <p>10/20/25 to 20/20/25</p>
          <img src={rightarrow} alt="" />
        </div>
      </div>
    </>
  );
}

export default Tripbar;
