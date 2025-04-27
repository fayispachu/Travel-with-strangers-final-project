import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { AgencyContext } from "../context/AgencyContext";

function Userloginsetup() {
  const { user, loading } = useContext(UserContext);
  const { agency } = useContext(AgencyContext);
  if (loading) return null;
  return (
    <>
      <div className="md:flex hidden ">
        {" "}
        {!agency && !user ? (
          <div className=" flex items-center  gap-9">
            <Link to={"/login"}>
              <button className="bg-[#33D69F] rounded-l-full  px-[40%] py-2 font-semibold border border-[#33D69F] ">
                Login
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="bg-white rounded-r-full px-[25%] text-black py-2 font-semibold border border-white ">
                Signup
              </button>
            </Link>{" "}
          </div>
        ) : (
          <div className="md:flex flex-row  gap-6 absolute z-50  ">
            <span className="flex flex-row items-center justify-start">
              {" "}
              <Link to={"/profile"}>
                <h1 className="font-bold text-xl p-2">
                  {agency ? agency?.agencyName : user?.name}
                </h1>{" "}
              </Link>
              <img
                className=" flex w-12 rounded-full "
                src={
                  agency
                    ? agency?.profileImage
                    : user?.profileImage || "Add image "
                }
                alt=""
              />
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default Userloginsetup;
