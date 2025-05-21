import React, { useContext, useEffect } from "react";
import home from "../assets/home.jpg"; // Use a travel-related image
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import OurServises from "../components/OurServises";
import LatestTrips from "../components/LatestTrips";
import MostVisitedPlace from "../components/MostVisitedPlace";
import { UserContext } from "../context/UserContext";
import UserSection from "../components/UserSection";
import Footer from "../components/Footer";

function Home() {
  const { checkUser } = useContext(UserContext);

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />

      <div
        className="relative flex items-center justify-center h-[80vh]   md:h-[100vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${home})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
        <div className="absolute md:top-64 top-32 z-30 flex flex-col items-center gap-6 md:gap-10 text-white text-center px-4">
          <h1 className="font-semibold  text-4xl md:text-5xl font-display">
            Discover the Wonderful World!
          </h1>

          <div className="text-lg md:text-xl font-medium px-6">
            <p>"Achive Your dream With Strangers" </p>
          </div>
          <a href="#service">
            {" "}
            <button className="bg-[#33D69F] transition duration-300 ease-in-out md:px-12 md:py-4 px-3 py-3 text-white font-bold rounded-lg shadow-lg transform hover:scale-105">
              Get Started
            </button>
          </a>
        </div>
      </div>

      <OurServises />
      <LatestTrips />
      <UserSection />
      <MostVisitedPlace />
      <Footer />
    </>
  );
}

export default Home;
