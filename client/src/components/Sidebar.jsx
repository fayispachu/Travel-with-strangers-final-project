import React, { useContext } from "react";
import userimage from "../assets/userimg.avif";
import { Link } from "react-router-dom";
import logout from "../assets/logout.png";
import { UserContext } from "../context/UserContext";
function Sidebar() {
  const { user, toggleSidebar, sidebarOpen } = useContext(UserContext);

  return (
    <>
      {sidebarOpen && (
        <div className="flex justify-end">
          {" "}
          <div className="bg-black/95 pb-5 pl-5  flex justify-start  md:hidden  items-start  w-[60%] h-80 text-white absolute rounded-md top-16 z-50  p-2 ">
            <div className=" mb-5  gap-3 ">
              <span className="flex flex-row items-center justify-start">
                {" "}
                <Link to={"/register"}>
                  <img
                    className="md:hidden flex   w-12 rounded-full "
                    src={userimage}
                    alt=""
                  />
                </Link>
                <h1 className="font-bold text-xl p-2">{user?.name}</h1>
              </span>
              <h1 className="font-bold text-xl py-2">{user?.email}</h1>
              <ul className="  flex flex-col justify-center items-start gap-2 mt-3">
                {" "}
                <li
                  onClick={toggleSidebar}
                  className="text-white font-bold text-l font-[Montserrat]"
                >
                  Home
                </li>{" "}
                <li
                  onClick={toggleSidebar}
                  className="text-white font-bold text-l font-[Montserrat]"
                >
                  Trips
                </li>
                <li
                  onClick={toggleSidebar}
                  className="text-white font-bold text-l font-[Montserrat]"
                >
                  About us
                </li>
                <li
                  onClick={toggleSidebar}
                  className="text-white font-bold text-l font-[Montserrat]"
                >
                  Contact
                </li>
                <li
                  onClick={toggleSidebar}
                  className="text-white font-bold text-l font-[Montserrat]"
                >
                  Best places
                </li>
              </ul>{" "}
              <Link to={"/login"}>
                <div className="flex flex-row items-center justify-center">
                  <img className="w-6" src={logout} alt="" />
                  <h1>Logout</h1>
                </div>
              </Link>
            </div>{" "}
          </div>{" "}
        </div>
      )}
    </>
  );
}

export default Sidebar;
