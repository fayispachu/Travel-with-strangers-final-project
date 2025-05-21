import { useContext, useEffect } from "react";
import { JoinTripContext } from "../context/JoinTripContext";
import userProfile from "../assets/boy.png";

function Joinedtrip() {
  const { joinedTrips, handleGetJoinedTrips } = useContext(JoinTripContext);

  useEffect(() => {
    handleGetJoinedTrips();
  }, []);

  return (
    <div className="md:flex hidden bg-gray-50 min-h-[60vh] justify-center gap-7 w-full py-20 flex-wrap">
      {joinedTrips.length === 0 ? (
        <p className="text-gray-500">You haven't joined any trips yet.</p>
      ) : (
        joinedTrips.map((trip) => (
          <div
            key={trip._id}
            className="w-[20%] bg-white h-[37vh] rounded-md shadow-md flex flex-col py-3 px-2 gap-3"
          >
            <div className="flex items-center gap-2">
              <img className="w-5" src={userProfile} alt="user" />
              <h1 className="font-bold text-md">
                {trip.creatorName || "Trip Host"}
              </h1>
            </div>
            <img
              className="w-full h-20 rounded-sm object-cover"
              src={trip.image || "/default-trip.jpg"}
              alt="trip"
            />
            <div className="flex flex-col items-start gap-2">
              <h1 className="font-bold text-md">{trip.place}</h1>
              <p className="text-sm text-gray-600 truncate">{trip.details}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Joinedtrip;
