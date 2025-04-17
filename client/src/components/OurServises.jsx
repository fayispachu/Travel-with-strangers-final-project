import React from "react";
import bikers from "../assets/bikers.jpg";
import groupice from "../assets/groupice.jpg";
import tpicture from "../assets/tpicture.jpg";
function OurServises() {
  return (
    <>
      <div className="bg-gray-100 pt-10 flex flex-col  items-center  h-[100vh] ">
        <h1 className="pb-16 font-bold md:text-3xl text-2xl font-[Poppins]">
          Our Services
        </h1>
        <div className=" flex flex-row gap-3  w-[100%]  ">
          {/* left section */}
          <div
            id="left"
            className="bg-gray-100  w-[50%] h-[75vh] justify-center items-center flex flex-col gap-3  "
          >
            <div className="flex flex-row w-[100%] gap-5">
              {" "}
              {/* image section */}
              <div className="w-[50%] drop-shadow-md h-[35vh] flex items-center justify-center p-5 ">
                <img src={bikers} alt="" />
              </div>
              {/* text section */}
              <div className="w-[50%] drop-shadow-md h-[35vh] flex justify-center items-center p-5 ">
                {" "}
                <p>
                  "Strangers may come and go within a short time. But the
                  memories remain ever bright — in a way that the memories can
                  never be returned again."
                </p>
              </div>
            </div>
            <div className="flex flex-row w-[100%] gap-5">
              {" "}
              {/* text section */}
              <div className="w-[50%] drop-shadow-md h-[35vh] flex justify-center items-center p-5 ">
                {" "}
                <p>
                  "Strangers may come and go within a short time. But the
                  memories remain ever bright — in a way that the memories can
                  never be returned again."
                </p>
              </div>{" "}
              {/* image section */}
              <div className="w-[50%] drop-shadow-md h-[35vh] flex items-center justify-center p-5">
                <img src={groupice} alt="" />
              </div>
            </div>
          </div>
          <div
            id="right"
            className="bg-gray-100  w-[50%] h-[75vh] justify-center items-center flex flex-col gap-3  "
          >
            <div className="flex flex-row w-[100%] gap-5">
              {" "}
              {/* image section */}
              <div className="w-[50%] drop-shadow-md h-[35vh] flex items-center justify-center p-5 ">
                <img src={tpicture} alt="" />
              </div>
              {/* text section */}
              <div className="w-[50%] drop-shadow-md h-[35vh] flex justify-center items-center p-5 ">
                {" "}
                <p>
                  "Strangers may come and go within a short time. But the
                  memories remain ever bright — in a way that the memories can
                  never be returned again."
                </p>
              </div>
            </div>
            <div className="flex flex-row w-[100%] gap-5">
              {" "}
              {/* text section */}
              <div className="w-[50%] drop-shadow-md h-[35vh] flex justify-center items-center p-5 ">
                {" "}
                <p>
                  "Strangers may come and go within a short time. But the
                  memories remain ever bright — in a way that the memories can
                  never be returned again."
                </p>
              </div>{" "}
              {/* image section */}
              <div className="w-[50%] drop-shadow-md h-[35vh] flex items-center justify-center p-5">
                <img src={bikers} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurServises;
