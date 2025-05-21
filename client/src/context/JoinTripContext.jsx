// src/context/JoinTripContext.jsx
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { TripContext } from "./TripContext";

export const JoinTripContext = createContext();

export const JoinTripProvider = ({ children }) => {
  const [joinStatus, setJoinStatus] = useState("");
  const { joinedUser, updateJoinedUser } = useContext(UserContext);
  const { oneTrip: trip } = useContext(TripContext);
  const [joinPopup, setJoinPopup] = useState(false);
  const [joinedTrips, setJoinedTrips] = useState([]);

  const navigate = useNavigate();

  // Fetch joined trips from backend
  const handleGetJoinedTrips = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/chat/joined-trips",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        setJoinedTrips(data.joinedTrips || []);
      }
    } catch (error) {
      console.error("Error fetching joined trips:", error);
    }
  };

  const openPopup = () => {
    setJoinPopup(true);
  };
  const closePopup = () => {
    setJoinPopup(false);
  };

  // Join group/trip
  const handleJoinGroup = async () => {
    if (!trip?._id) {
      setJoinStatus("No trip selected");
      return;
    }

    // Check if already joined
    const isJoined = joinedUser && joinedUser.includes(trip._id);
    if (isJoined) {
      setJoinStatus("You have already joined this group.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/chat/join",
        { tripId: trip._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        updateJoinedUser(trip._id);
        setJoinStatus("Joined group successfully!");
        navigate(`/chat/${data.room}`);
      } else {
        setJoinStatus("Failed to join the group.");
      }
    } catch (error) {
      console.error("Error joining group:", error);
      setJoinStatus("Failed to join group.");
    }
  };

  return (
    <JoinTripContext.Provider
      value={{
        joinPopup,
        closePopup,
        openPopup,
        joinStatus,
        handleJoinGroup,
        joinedTrips,
        handleGetJoinedTrips,
      }}
    >
      {children}
    </JoinTripContext.Provider>
  );
};
