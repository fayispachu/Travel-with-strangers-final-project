import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import JoinedTrip from "../components/Joinedtrip";
import YourTrip from "../components/YourTrip";
import { UserContext } from "../context/UserContext";
import UserPost from "../components/UserPost";
import { TripContext } from "../context/TripContext";
import YourSaved from "../components/YourSaved";
import { AgencyContext } from "../context/AgencyContext";

function Profile() {
  const [yourTrip, setYourTrip] = useState(true);
  const [joinedTrip, setJoinedTrip] = useState(false);
  const [userPost, setUserPost] = useState(false);

  const { checkUser, user, setProfilepic } = useContext(UserContext);
  const { yourSaved, handleOpenYourSaved, handleCloseYourSaved } =
    useContext(TripContext);
  const { agency, setProfile } = useContext(AgencyContext);
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-[100%] h-full flex flex-col bg-gradient-to-br from-[#f0fdf4] to-white">
        <div className="flex items-center flex-row h-[40vh] bg-[#33D69F] w-[100%] pl-32 gap-5 px-10 pt-24 shadow-md">
          <div className="rounded-full w-32 h-32 bg-white border-4 border-white flex justify-center items-center shadow-lg">
            {!agency?.profileImage && !user?.profileImage && (
              <input
                type="file"
                className="inset-0 opacity-0 cursor-pointer"
                onChange={() => {
                  setProfilepic(), setProfile();
                }}
              />
            )}
            <img
              className="rounded-full w-[98%] h-[98%] object-cover "
              src={
                agency
                  ? agency?.profileImage
                  : user?.profileImage || "Add image "
              }
              alt="profile"
            />
          </div>
          <div className="flex flex-col gap-2 mt-16">
            <h1 className="font-bold text-2xl font-[Montserrat] text-white">
              Hello, {agency ? agency?.agencyName : user?.name || "Traveler"} 👋
            </h1>
            <p className="text-white text-sm">🌴 Based in Kerala</p>
            <p className="text-white text-xs mt-1">
              Iam super soft, Iam a nice man!
            </p>
          </div>
          <div className="w-[50%] h-[7vh] flex justify-center flex-row p-1 gap-1 mt-24 ml-28">
            <button
              onClick={() => {
                setYourTrip(true);
                setJoinedTrip(false),
                  setUserPost(false),
                  handleCloseYourSaved();
              }}
              className="bg-white text-[#333] hover:bg-[#f9f9f9] font-medium px-6 py-2 shadow-sm transition"
            >
              Your Trips
            </button>
            <button
              onClick={() => {
                setYourTrip(false);
                setJoinedTrip(true), setUserPost(false), handleCloseYourSaved();
              }}
              className="bg-white text-[#333] hover:bg-[#f9f9f9] font-medium  px-6 py-2 shadow-sm transition"
            >
              Joined
            </button>{" "}
            <button
              onClick={() => {
                setYourTrip(false);
                setJoinedTrip(false), setUserPost(true), handleCloseYourSaved();
              }}
              className="bg-white text-[#333] hover:bg-[#f9f9f9] font-medium px-6 py-2 shadow-sm transition"
            >
              Your post
            </button>
            <button
              onClick={() => {
                handleOpenYourSaved(),
                  setYourTrip(false),
                  setJoinedTrip(false),
                  setUserPost(false);
              }}
              className="bg-white text-[#333] hover:bg-[#f9f9f9] font-medium  px-6 py-2 shadow-sm transition"
            >
              Saved
            </button>{" "}
          </div>
        </div>
      </div>
      {joinedTrip && <JoinedTrip />}
      {yourTrip && <YourTrip />}
      {userPost && <UserPost />}
      {yourSaved && <YourSaved />}
    </>
  );
}

export default Profile;
