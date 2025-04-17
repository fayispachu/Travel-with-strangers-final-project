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

  const handleGetTrips = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/trip/alltrips?place=${searchTerm}`
      );
      setTrips(data.allTrips);
      setFilteredTrip(data.allTrips);
      console.log(searchTerm);
      console.log(data.searchTrips);

      console.log(data.allTrips);
    } catch (error) {
      console.log("Error from frontend getAll Trips", error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = trips.filter((trips) =>
        trips.place.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTrip(filtered);
    }
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

  return (
    <TripContext.Provider
      value={{
        handleClose,
        handleGetTrips,
        handleOneTrip,
        handleOpen,
        setSearchTerm,
        filteredTrip,
        searchTerm,
        oneTrip,
        isOpen,
        trips,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
