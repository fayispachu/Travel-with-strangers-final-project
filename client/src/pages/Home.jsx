import React, { useContext, useEffect } from "react";
import home from "../assets/home.jpg";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import OurServises from "../components/OurServises";
import LatestTrips from "../components/LatestTrips";
import MostVisitedPlace from "../components/MostVisitedPlace";
import { UserContext } from "../context/AuthenticationContext";

function Home() {
  const { checkUser } = useContext(UserContext);
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="flex items-center  justify-end h-[100vh]">
        <div className=" bg-black/40 w-[100%] h-[100vh] absolute"></div>
        <img className="w-[100%] h-[100vh] " src={home} alt="" />
        <div className="absolute flex flex-col items-start md:gap-10 gap-5  left-44 top-56 ">
          <h1 className=" font-semibold  font-display  md:text-5xl text-5xl   text-white  ">
            Discover the wonderful World !
          </h1>
          <p>
            "Strangers may come and go within a short time. But the memories
            remain ever bright — in a way that the memories can never be
            returned again."
          </p>
          {/* <div className="bg-[#33D69F] w-96 h-24   absolute "></div> */}
        </div>
        <button className="bg-[#3ecdc6] absolute rounded-md  md:px-16 px-10 py-3 bottom-20 text-white font-semibold border border-[#33D69F] ">
          Get started
        </button>
      </div>
      <OurServises />
      <LatestTrips />
      <MostVisitedPlace />
    </>
  );
}

export default Home;
