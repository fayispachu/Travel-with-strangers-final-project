import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { TripContext } from "./TripContext";

export const JoinTripContext = createContext();

export const JoinTripProvider = ({ children }) => {
  const [joinStatus, setJoinStatus] = useState("");
  const [joinPopup, setJoinPopup] = useState(false);
  const [joinedTrips, setJoinedTrips] = useState([]);
  const { joinedUser, updateJoinedUser } = useContext(UserContext);
  const { oneTrip: trip } = useContext(TripContext);
  const navigate = useNavigate();

  const handleJoinGroup = async () => {
    if (!trip?._id) return setJoinStatus("Trip ID missing.");
    if (joinedUser?.includes(trip._id)) {
      return setJoinStatus("Already joined this group.");
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
        setJoinStatus("Joined successfully!");
        setJoinPopup(false);
        navigate(`/chat/${data.room}`);
      } else {
        setJoinStatus("Failed to join group.");
      }
    } catch (error) {
      console.error("Join error:", error);
      setJoinStatus("Failed to join group.");
    }
  };

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
        setJoinedTrips(data.joinedTrips);
      }
    } catch (error) {
      console.error("Failed to fetch joined trips:", error);
    }
  }; 

  return (
    <JoinTripContext.Provider
      value={{
        joinStatus,
        joinPopup,
        openPopup: () => setJoinPopup(true),
        closePopup: () => setJoinPopup(false),
        handleJoinGroup,
        joinedTrips,
        handleGetJoinedTrips,
      }}
    >
      {children}
    </JoinTripContext.Provider>
    
  );
};
