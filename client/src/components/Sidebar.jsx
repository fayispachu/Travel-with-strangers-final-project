import React, { useContext } from "react";
import userimage from "../assets/userimg.avif"; // User profile image
import { Link } from "react-router-dom";
import logout from "../assets/logout.png"; // Logout icon
import { UserContext } from "../context/UserContext";
import close from "../assets/close.png";
function Sidebar() {
  const { user, sidebarOpen, CloseSidebar } = useContext(UserContext);

  return (
    <>
      {sidebarOpen && (
        <div
          className={`fixed top-0 left-0 bg-[#34495E]  w-[70%] md:w-[300px] h-full z-50 p-6 rounded-r-lg shadow-xl transition-all transform md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-8 flex flex-col items-center gap-5">
            <img
              onClick={CloseSidebar}
              className="absolute right-5"
              src={close}
              alt=""
            />
            <Link to="/profile">
              <img
                className="w-20 h-20 rounded-full border-4 border-[#2980B9]"
                src={userimage}
                alt="User"
              />

              <h1 className="text-white text-2xl font-semibold">
                {user?.name}
              </h1>
              <p className="text-white text-sm">{user?.email}</p>
            </Link>
          </div>

          <ul className="gap-5 text-white">
            <li className="text-xl font-semibold hover:text-[#3498DB] cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="text-xl font-semibold hover:text-[#3498DB] cursor-pointer">
              <Link to="/trips">Trips</Link>
            </li>
            <li className="text-xl font-semibold hover:text-[#3498DB] cursor-pointer">
              <Link to="/about">About Us</Link>
            </li>
            <li className="text-xl font-semibold hover:text-[#3498DB] cursor-pointer">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="text-xl font-semibold hover:text-[#3498DB] cursor-pointer">
              <Link to="/best-places">Best Places</Link>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="mt-8 flex items-center justify-center text-white text-lg font-semibold hover:text-[#3498DB] cursor-pointer">
            <img className="w-6 mr-2" src={logout} alt="Logout" />
            <Link to="/login">Logout</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
