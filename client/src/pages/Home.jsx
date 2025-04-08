import React from "react";
import home from "../assets/homeimage.jpg";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import OurServises from "../components/OurServises";
import LatestTrips from "../components/LatestTrips";
import MostVisitedPlace from "../components/MostVisitedPlace";
import CreatePopup from "../components/CreatePopup";
function Home() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="flex justify-center items-center">
        <img className="w-screen h-screen " src={home} alt="" />
        <div className="absolute flex flex-col items-start md:gap-10 gap-5 ">
          <h1 className=" font-semibold font-[Poppins] md:text-7xl text-5xl   text-white  ">
            Discover{" "}
          </h1>
          <h1 className=" font-semibold font-[Poppins]  md:text-7xl text-5xl   text-white ">
            the wonderful
          </h1>
          <h1 className=" font-semibold font-[Poppins]  md:text-7xl text-5xl  text-white ">
            World !
          </h1>
          {/* <div className="bg-[#33D69F] w-96 h-24   absolute "></div> */}
        </div>
        <button className="bg-[#33D69F] absolute rounded-md  md:px-16 px-10 py-3 bottom-20 text-white font-semibold border border-[#33D69F] ">
          Get started
        </button>
      </div>
      <CreatePopup />
      <OurServises />
      <LatestTrips />
      <MostVisitedPlace />
    </>
  );
}

export default Home;
