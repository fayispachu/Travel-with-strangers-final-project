import React, { useContext } from "react";
import userimage from "../assets/userimg.avif";
import menu from "../assets/down.png";
import Sidebar from "./Sidebar";
import Userloginsetup from "./Userloginsetup";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
function Navbar() {
  const { toggleSidebar } = useContext(UserContext);
  return (
    <>
      <div className="bg-black/40 absolute z-50  w-[100%] md:py-2 py-3 flex flex-row pl-5 md:pl-10 overflow-hidden  items-center gap-[45%]  md:gap-28">
        <h1 className="text-white font-[Poppins] font-bold text-lg md:text-2xl">
          Travel guys
        </h1>
        <ul className=" hidden md:flex  fex-row justify-center items-center md:gap-24 mr-16 ">
          <Link to="#mostvisited">
            {" "}
            <li className="text-white font-bold text-xl font-[Montserrat]">
              Best places
            </li>
          </Link>
          <li className="text-white font-bold text-xl font-[Montserrat]  ">
            About us
          </li>
          <a href="/">
            {" "}
            <li className="text-white font-bold text-2xl font-[Montserrat]">
              Home
            </li>{" "}
          </a>
          <li className="text-white font-bold text-xl font-[Montserrat]">
            Contact
          </li>
          <li className="text-white font-bold text-xl font-[Montserrat] ">
            Trips
          </li>
        </ul>{" "}
        <div className="flex flex-row items-center gap-3 justify-center md:hidden  ">
          {" "}
          <img
            className="md:hidden flex ml-5 bg-black  w-10 rounded-full "
            src={userimage}
            alt=""
          />
          <img onClick={toggleSidebar} className="w-5 " src={menu} alt="" />
        </div>
        <Userloginsetup />
      </div>
      <Sidebar />
    </>
  );
}

export default Navbar;
