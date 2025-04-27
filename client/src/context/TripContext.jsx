import { createContext } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [oneTrip, setOneTrip] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrip, setFilteredTrip] = useState([]);
  const [trips, setTrips] = useState([]);
  const handleClose = () => {
    setIsOpen(false);
  };
  const [isPopup, setPopup] = useState(false);
  const [image, setImage] = useState("");
  const [place, setPlace] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [yourSaved, setYourSaved] = useState(false);

  function openPopup() {
    setPopup(true);
  }
  function closePopup() {
    setPopup(false);
  }

  const handleAddImage = async (e) => {
    try {
      const image = e.target.files[0];
      if (!image) return console.log("poi image settkk");
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "Trip_plan_imges");
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dtcjm5qss/image/upload",
        formData
      );

      setImage(data.secure_url);
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

  // gerall trips
  const handleGetTrips = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/trip/alltrips?place=${searchTerm}`
      );
      setTrips(data.allTrips);
      setFilteredTrip(data.allTrips);
      console.log(data.searchTrips);
      if (data.allTrips.length > 0) {
        setOneTrip(data.allTrips[0]);
        setIsOpen(true);
      }
      console.log(data.allTrips);
    } catch (error) {
      console.log("Error from frontend getAll Trips", error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = trips.filter((trips) => trips.place);
      setFilteredTrip(filtered);
    }

    handleGetTrips();
  }, [searchTerm]);

  const handleOneTrip = async (id) => {
    if (!id) {
      console.log("undefined id");
    }
    // const token = localStorage.getItem("token");

    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/trip/onetrip?id=${id}`
        // {
        //   headers: { Authorization: `Bearer ${token}` },
        //   "Content-Type": "application/json",
        // }
      );
      setOneTrip(data.trip);
      console.log(id);

      console.log("fetched data : ", data.trip);
    } catch (error) {
      console.log(error, "Error in Card getOneTrip");
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };



  function handleOpenYourSaved() {
    setYourSaved(true);
  }

  function handleCloseYourSaved() {
    setYourSaved(false);
  }
  return (
    <TripContext.Provider
      value={{
        yourSaved,
        handleCloseYourSaved,
        handleOpenYourSaved,
        handleClose,
        handleGetTrips,
        handleOneTrip,
        handleOpen,
        setSearchTerm,
        handleAddImage,
        setDate,
        handleCreateTrip,
        setImage,
        openPopup,
        date,
        setDetails,
        closePopup,
        setPlace,
        isOpen,
        filteredTrip,
        searchTerm,
        oneTrip,
        isPopup,
        trips,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
