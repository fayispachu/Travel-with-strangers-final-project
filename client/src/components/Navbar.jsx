import React, { useState } from "react";
import { Link } from "react-router-dom";
import userimage from "../assets/userimage.avif";
import menu from "../assets/down.png";
import Sidebar from "./Sidebar";
function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen((prevState) => !prevState);
  }
  // function handleCloseSidebar() {
  //   setSidebarOpen(false);
  // }
  return (
    <>
      <div className="bg-black/50 absolute  w-[100%] md:py-5 py-3 flex flex-row pl-5 md:pl-10   items-center gap-[45%] md:gap-32">
        <h1 className="text-white font-[Poppins] font-bold text-lg md:text-2xl">
          Travel guys
        </h1>
        <ul className=" hidden md:flex fex-row justify-center items-center md:gap-24 mr-10 ">
          <li className="text-white font-bold text-xl font-[Montserrat]">
            Best places
          </li>
          <li className="text-white font-bold text-xl font-[Montserrat]  ">
            About us
          </li>
          <li className="text-white font-bold text-2xl font-[Montserrat]">
            Home
          </li>{" "}
          <li className="text-white font-bold text-xl font-[Montserrat]">
            Contact
          </li>
          <li className="text-white font-bold text-xl font-[Montserrat] ">
            Trips
          </li>
        </ul>{" "}
        <div className="flex flex-row items-center gap-3 justify-center md:hidden">
          {" "}
          <img
            className="md:hidden flex ml-5 bg-black  w-10 rounded-full "
            src={userimage}
            alt=""
          />
          <img onClick={toggleSidebar} className="w-5 " src={menu} alt="" />
        </div>
        <div className="md:flex flex-row items-center gap-6 hidden ">
          <Link to={"/login"}>
            <button className="bg-[#33D69F] rounded-md  px-[20%] py-2 font-semibold border border-[#33D69F] ">
              Login
            </button>
          </Link>

          <Link to={"/register"}>
            <button className="bg-white rounded-md px-[10%] text-black py-2 font-semibold border border-white ">
              Signup
            </button>
          </Link>
        </div>{" "}
      </div>
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
    </>
  );
}

export default Navbar;
