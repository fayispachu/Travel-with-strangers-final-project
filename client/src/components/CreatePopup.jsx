import React, { useContext } from "react";
import userProfile from "../assets/boy.png";
import close from "../assets/close.png";
import { TripContext } from "../context/TripContext";
function CreatePopup() {
  const {
    isPopup,
    setDate,

    place,

    details,
    date,
    setDetails,
    closePopup,
    handleAddImage,
    handleCreateTrip,
    setPlace,
  } = useContext(TripContext);

  return (
    <>
      {isPopup && (
        <div className="md:flex z-50 md:top-20 top-16  bg-white/70 w-[100%] h-[90vh] absolute items-center flex-col justify-center  rounded-md  ">
          <img
            className="absolute right-10 top-10"
            onClick={closePopup}
            src={close}
            alt="close"
          />
          <div className="md:w-96 w-[80%] bg-white md:h-[60vh] h-[50vh]  mt-32 mx-10 rounded-md drop-shadow-xl gap-3 flex flex-col md:p-6 px-5 py-4   ">
            <div className=" flex flex-row items-start gap-2">
              <img className="" src={userProfile} alt="add image" />
              <h1 className="font-bold text-lg">Fayiz.k</h1>
            </div>
            <input
              type="file"
              onChange={handleAddImage}
              className="md:w-[100%]  md:h-36 h-24 rounded-md"
              placeholder="Add image"
              alt=""
            />
            <div className="flex flex-col items-start gap-2 ">
              <input
                onChange={(e) => setPlace(e.target.value)}
                className="font-bold md:text-lg  border"
                value={place}
                placeholder="place name"
              />
              <input
                onChange={(e) => setDate(e.target.value)}
                className="font-bold md:text-lg  border"
                value={date}
                type="date"
                placeholder="Date"
              />

              <input
                onChange={(e) => setDetails(e.target.value)}
                className="border"
                value={details}
                placeholder="details"
              />

              <button
                onClick={handleCreateTrip}
                className="px-5 py-3 text-white bg-black rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreatePopup;
