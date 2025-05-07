import React, { useEffect, useState } from "react";
import axios from "axios";

function YourTrip() {
  const [myTrip, setMyTrip] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle fetching trips
  const handleMyTrip = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    setLoading(true); // Start loading
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/trip/mytrip`, // Backend API endpoint
        {
          headers: { Authorization: `Bearer ${token}` }, // Authorization header
        }
      );
      setMyTrip(data.myTrip);
      setLoading(false); // Stop loading after data is fetched
    } catch (error) {
      setLoading(false);
      setError("Error fetching trips. Please try again later.");
      console.log("Error in getMyTrip:", error);
    }
  };

  // Fetch trips on component mount
  useEffect(() => {
    handleMyTrip();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 px-4 py-10 bg-gray-50 min-h-screen">
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {myTrip.length > 0 ? (
        myTrip.map((mytrip) => (
          <div
            key={mytrip._id}
            className="w-full sm:w-[80%] md:w-[45%] lg:w-[22%] bg-green-200 rounded-md shadow-lg p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <img
                className="w-6 h-6 rounded-full"
                src={mytrip?.profile}
                alt="profile"
              />
              <h1 className="font-bold text-md">{mytrip?.name}</h1>
            </div>
            <img
              className="w-full h-32 object-cover rounded-sm"
              src={mytrip?.image}
              alt="trip"
            />
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-lg">{mytrip?.place}</h1>
              <p className="text-sm">{mytrip?.details}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-red-600 text-2xl w-full">
          No Trips found
        </p>
      )}
    </div>
  );
}

export default YourTrip;
