import React, { useState } from "react";
import userProfile from "../assets/boy.png";
import CreateButton from "./CreateButton";
import close from "../assets/close.png";
import axios from "axios";
function CreatePopup() {
  const [isPopup, setPopup] = useState(false);
  const [image, setImage] = useState("");
  const [place, setPlace] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");

  function openPopup() {
    setPopup(true);
  }
  function closePopup() {
    setPopup(false);
  }

  const handleAddImage = async (e) => {
    try {
      const image = e.target.files[0];
      if (!image) return;

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "Trip_plan_imges");
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dtcjm5qss/image/upload",
        formData
      );

      setImage(data.secure_url);
      console.log("uploadedImage", data);
    } catch (error) {
      console.log(error, "Error from adding image trip front");
    }
  };

  const handleCreateTrip = async () => {
    if (!image || !place || !details) {
      console.log("All fields are required");
      return;
    }
    const createdTrip = {
      image: image,
      place,
      details,
      date,
    };
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/trip/createtrip",
        createdTrip,
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        }
      );
      console.log(data.newTrip);
      setImage("");
      setPlace("");
      setDetails("");
      closePopup();
    } catch (error) {
      console.log(error, "Error from Creating trip front");
    }
  };

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
      <CreateButton openPopup={openPopup} />
    </>
  );
}

export default CreatePopup;
