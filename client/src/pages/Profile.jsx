import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import userimage from "../assets/userimg.avif";
import JoinedTrip from "../components/Joinedtrip";
import YourTrip from "../components/YourTrip";
import { UserContext } from "../context/AuthenticationContext";
function Profile() {
  const [yourTrip, setYourTrip] = useState(true);
  const [joinedTrip, setJoinedTrip] = useState(false);

  const openYourTrip = () => {
    setYourTrip((prev) => !prev);
  };

  const openJoinedTrip = () => {
    setJoinedTrip((prev) => !prev);
  };

  const { checkUser, user } = useContext(UserContext);
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      {" "}
      <Navbar />{" "}
      <div className="w-[100%] h-full  flex flex-col ">
        {" "}
        <div className="flex items-center flex-row h-[40vh] bg-[#33D69F] w-[100%] pl-32 gap-5  px-10 pt-24">
          {" "}
          <div className="rounded-full w-32 h-32 bg-black  flex justify-center items-center ">
            {" "}
            <img className="rounded-full w-[98%] " src={userimage} alt="" />
          </div>
          <div className="flex flex-col gap-3 mt-16">
            <h1 className="font-bold text-xl font-[Montserrat]">
              I am {user?.name}
            </h1>
            <p>🌴Kerala</p>
          </div>
          <div className="w-[50%]    h-[7vh] flex justify-center  flex-row   p-1 gap-3 mt-24 ml-28 ">
            {" "}
            <button
              onClick={() => {
                openJoinedTrip(), openYourTrip();
              }}
              className="hover:outline-2 hover:outline-black  bg-white w-[20%] py-2 "
            >
              Your Trips
            </button>
            <button
              onClick={() => {
                openJoinedTrip(), openYourTrip();
              }}
              className="hover:outline-2 hover:outline-black  w-[20%] bg-white py-2  "
            >
              Joined
            </button>
            <button className="hover:outline-2 hover:outline-black  w-[20%] bg-white py-2">
              Saved
            </button>
            {/* <button className="hover:bg-[#33D69F] w-[20%] bg-white py-2 ">
              Edit
            </button>
            <button className="hover:bg-[#33D69F] w-[20%] bg-white  py-2">
              Log out
            </button> */}
          </div>
        </div>
      </div>
      {joinedTrip && <JoinedTrip />}
      {yourTrip && <YourTrip />}
    </>
  );
}

export default Profile;
