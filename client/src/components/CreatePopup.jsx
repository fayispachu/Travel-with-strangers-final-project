import React, { useState } from "react";
import userProfile from "../assets/boy.png";
import CreateButton from "./CreateButton";
import close from "../assets/close.png";
import axios from "axios";
function CreatePopup() {
  const [isPopup, setPopup] = useState(false);

  const [image, setImage] = useState(null);
  const [place, setPlace] = useState("");
  const [details, setDetails] = useState("");

  function openPopup() {
    setPopup(true);
  }
  function closePopup() {
    setPopup(false);
  }
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreating = async () => {
    if (!image || !place || !details) {
      console.log("all fields are required");
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("upload_preset", "Trip_plan_imges");
    formData.append("cloud_name", "dtcjm5qss");
    const res = await axios.post(
      "https://api.cloudinary.com=cloudinary://763364614137655:n36Ix9WVvYSdObXqt3QB0f7nHPs@dtcjm5qss",
      {
        body: formData,
      }
    );
    const uploadedImage = await res.json();
    console.log(uploadedImage);

    formData.append("place", place);
    formData.append("details", details);

    console.log("FormData values:", { image, place, details });

    try { 
      const { data } = await axios.post(
        "http://localhost:4000/api/trip/createdtrip",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(data);
      closePopup();
    } catch (error) {
      console.log(error, "error in create popup create");
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
              onChange={handleImageChange}
              className="md:w-[100%]  md:h-36 h-24 rounded-md"
              alt=""
            />
            <div className="flex flex-col items-start gap-2 ">
              <input
                onChange={(e) => setPlace(e.target.value)}
                className="font-bold md:text-lg  border"
                value={place}
              />
              <input
                onChange={(e) => setDetails(e.target.value)}
                className="border"
                value={details}
              />

              <button
                onClick={handleCreating}
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
