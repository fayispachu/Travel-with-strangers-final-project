import React, { useContext, useEffect, useState } from "react";
import userimage from "../assets/userimg.avif"; // User image
import menu from "../assets/down.png"; // Hamburger menu
import Sidebar from "./Sidebar";
import Userloginsetup from "./Userloginsetup";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { OpenSidebar } = useContext(UserContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <>
      <div
        className={`transition-transform duration-300 fixed top-0 w-full z-50 py-2 px-6 flex items-center justify-between shadow-lg ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } bg-white/0`}
      >
        {/* Logo */}
        <h1 className="text-white font-bold text-2xl font-[Poppins] tracking-wide">
          Travel Guys
        </h1>

        {/* Desktop Nav */}
        <ul className="hidden ml-[40%] md:flex space-x-16 text-white font-[Montserrat]">
          <li className="text-lg font-semibold hover:text-black">
            <Link to="/">Home</Link>
          </li>
          <li className="text-lg font-semibold hover:text-black">
            <Link to="/trips">Trips</Link>
          </li>
          <li className="text-lg font-semibold hover:text-black">
            <Link to="/about">About Us</Link>
          </li>
          <li className="text-lg font-semibold hover:text-black">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Mobile Nav */}
        <div className="flex items-center gap-3 md:hidden">
          <img
            className="w-10 rounded-full border-2 border-white"
            src={userimage}
            alt="User"
          />
          <img
            onClick={OpenSidebar}
            className="w-6 cursor-pointer"
            src={menu}
            alt="Menu"
          />
        </div>
        <Userloginsetup />
      </div>
      <Sidebar />
    </>
  );
}

export default Navbar;
