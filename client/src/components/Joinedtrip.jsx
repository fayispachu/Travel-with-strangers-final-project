import { useContext, useEffect } from "react";
import { JoinTripContext } from "../context/JoinTripContext";
import userProfile from "../assets/boy.png";

function JoinedTrip() {
  const { joinedTrips, handleGetJoinedTrips } = useContext(JoinTripContext);

  useEffect(() => {
    handleGetJoinedTrips();
  }, []);

  return (
    <div className="w-full min-h-[60vh] px-4 py-10 bg-gradient-to-b from-gray-100 to-white">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 font-[Montserrat]">
        Trips You've Joined
      </h2>

      {joinedTrips.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven't joined any trips yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {joinedTrips.map((trip) => (
            <div
              key={trip._id}
              className="w-full max-w-[280px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden flex flex-col"
            >
              <img
                className="w-full h-40 object-cover"
                src={trip.image || "/default-trip.jpg"}
                alt="Trip"
              />
              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={userProfile}
                    alt="User"
                  />
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {trip.creatorName || "Trip Host"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 truncate">
                  {trip.place}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {trip.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JoinedTrip;
