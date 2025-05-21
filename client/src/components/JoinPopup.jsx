import { useContext } from "react";
import { JoinTripContext } from "../context/JoinTripContext";
import closeIcon from "../assets/close.png";

function JoinPopup() {
  const { joinPopup, handleJoinGroup, closePopup, joinStatus } =
    useContext(JoinTripContext);

  return (
    joinPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="w-[90%] sm:w-[500px] bg-white rounded-2xl shadow-2xl p-8 relative animate-fade-in">
          <img
            src={closeIcon}
            alt="close"
            className="absolute top-4 right-4 cursor-pointer w-5 hover:scale-110 transition-transform"
            onClick={closePopup}
          />
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-3">
            Join the Adventure!
          </h1>
          <p className="text-gray-600 text-center mb-6 px-2">
            You're about to join this trip group. Click the button below to
            confirm your spot and start exploring with fellow travelers.
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleJoinGroup}
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-300"
            >
              Join Now
            </button>
          </div>
          {joinStatus && (
            <p className="mt-6 text-center text-sm text-gray-500">
              {joinStatus}
            </p>
          )}
        </div>
      </div>
    )
  );
}

export default JoinPopup;
