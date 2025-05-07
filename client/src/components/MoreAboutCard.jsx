import React from "react";
import userProfile from "../assets/boy.png";
import tempplace from "../assets/tempplace.jpeg";
import closeicon from "../assets/close.png";
import instagram from "../assets/instagram.png";
import whatsapp from "../assets/whatsapp.png";

function MoreAboutCard({ oneTrip, closeMoreCard }) {
  const data = {
    detailsList: ["Visit Eiffel Tower", "Try local food"],
    instagram: "https://instagram.com/kanna._.nn",
    whatsapp: "https://wa.me/9744850680",
  };

  return (
    <div className="bg-gray-200/40 fixed w-full h-full top-0 left-0 z-50 flex items-center justify-center">
      <div className="bg-[#33D69F] relative w-full h-full flex justify-center items-center overflow-y-auto">
        <img
          onClick={closeMoreCard}
          className="absolute top-4 right-4 cursor-pointer w-6 h-6"
          src={closeicon}
          alt="Close"
        />
        <div className="flex md:w-4/5 w-full bg-white md:h-[70vh] h-[85vh] rounded-md drop-shadow-xl p-4 gap-4 flex-col md:flex-row overflow-y-scroll">
          {/* Left Side */}
          <div className="md:w-2/5 w-full flex flex-col items-center justify-center gap-4 p-4">
            <div className="flex flex-row items-center gap-2">
              <img className="w-12 h-12 rounded-full" src={userProfile} alt="User" />
              <h1 className="font-bold text-lg">{oneTrip?.name || "Host Name"}</h1>
            </div>
            <img
              className="w-full h-36 rounded-md object-cover"
              src={oneTrip?.image || tempplace}
              alt="Trip"
            />
          </div>

          {/* Right Side */}
          <div className="md:w-3/5 w-full flex flex-col p-4 gap-3">
            <h1 className="font-bold text-lg">{oneTrip?.place || "Choose Place"}</h1>
            <p className="text-gray-700">{oneTrip?.details || "Trip details not available."}</p>

            <div>
              <h2 className="font-semibold text-lg mt-2">Trip Highlights</h2>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {data.detailsList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex gap-4">
              <a href={data.instagram} target="_blank" rel="noopener noreferrer">
                <img className="w-7" src={instagram} alt="Instagram" />
              </a>
              <a href={data.whatsapp} target="_blank" rel="noopener noreferrer">
                <img className="w-7" src={whatsapp} alt="WhatsApp" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreAboutCard;
