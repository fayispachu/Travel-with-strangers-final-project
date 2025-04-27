import React, { useContext, useEffect } from "react";
import home from "../assets/home.jpg";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import OurServises from "../components/OurServises";
import LatestTrips from "../components/LatestTrips";
import MostVisitedPlace from "../components/MostVisitedPlace";
import { UserContext } from "../context/UserContext";
import UserSection from "../components/UserSection";
import { useNavigate } from "react-router-dom";
import { AgencyContext } from "../context/AgencyContext";

function Home() {
  const { checkUser, setUser } = useContext(UserContext);
  const { setAgency } = useContext(AgencyContext);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setAgency(null);
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="flex items-center  justify-end md:h-[100vh] h-[80vh]">
        <div className=" bg-black/40 w-[100%] md:h-[90vh] h-[80vh] absolute z-30  top-[9.3vh]"></div>
        <img
          className="w-[100%] md:h-[90vh] h-[80vh] absolute z-10 top-[9.3vh]"
          src={home}
          alt=""
        />
        <div className="absolute z-50 flex flex-col items-center md:gap-10 gap-5  md:left-44 md:top-56 top-96 left-2 ">
          <h1 className=" font-semibold  font-display  md:text-5xl text-3xl   text-white  ">
            Discover the wonderful
          </h1>
          <h1 className=" font-semibold  font-display  md:text-5xl text-3xl   text-white  ">
            {" "}
            World !
          </h1>
          <div className=" flex justify-start flex-col">
            {" "}
            <p className="font-semibold ">
              "Strangers may come and go within a short time.
            </p>
            <p className="font-semibold ">
              But the memories remain ever bright — in a way
            </p>
            <p className="font-semibold ">
              that the memories can never be returned again."
            </p>
          </div>
          {/* <div className="bg-[#33D69F] w-96 h-24   absolute "></div> */}
        </div>
        <button
          onClick={logout}
          className="bg-[#3ecdc6] absolute z-50 rounded-md  md:px-16 px-10 py-3 bottom-56 left-32 text-white font-semibold border border-[#33D69F] "
        >
          Get started
        </button>
      </div>
      <OurServises />
      <LatestTrips />
      <UserSection />
      <MostVisitedPlace />
    </>
  );
}

export default Home;
