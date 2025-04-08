import React from "react";
import Navbar from "../components/Navbar";
import userimage from "../assets/userimg.avif";
import profilebg from "../assets/Homeimage.png";
function Profile() {
  return (
    <>
      <Navbar />

      <div className="flex  flex-col">
        <img className="w-[100%] h-44 mt-20" src={profilebg} alt="" />
        <div className="flex flex-row   ">
          {" "}
          <div className="rounded-full w-40 h-40 bg-black absolute top-48 left-48 flex justify-center items-center ">
            {" "}
            <img className="rounded-full w-[98%] " src={userimage} alt="" />
          </div>
          <div className="flex flex-col gap-3  ml-96 mt-3">
            <h1 className="font-bold text-xl">Raju.Boom</h1>
            <p>🌴Kerala</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
