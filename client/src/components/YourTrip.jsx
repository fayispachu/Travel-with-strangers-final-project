import React, { useEffect, useState } from "react";
import axios from "axios";
function YourTrip() {
  const [myTrip, setMyTrip] = useState([]);

  const handleMyTrip = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token fount");
      return;
    }
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/trip/mytrip`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMyTrip(data.myTrip);
      console.log("fetched data :", data.myTrip);

      console.log("fetched data : ", data.myTrip);
    } catch (error) {
      console.log(error, "Error in Card getMyTrip");
    }
  };
  useEffect(() => {
    handleMyTrip();
  }, []);

  return (
    <>
      <div className="md:flex hidden  bg-gray-50 h-[60vh]   justify-center gap-7  w-[100%] py-20 ">
        {myTrip.length > 0 ? (
          myTrip.map((mytrip) => (
            <div
              key={mytrip?._id}
              className=" w-[20%] bg-green-200 h-[37vh]  rounded-md drop-shadow-xl gap-3 flex flex-col py-3 px-2   "
            >
              <div className=" flex flex-row items-center gap-2">
                <img className="w-5" src={mytrip?.profile} alt="" />
                <h1 className="font-bold text-md">{mytrip?.name}</h1>
              </div>
              <img
                className="w-[100%]  h-20 rounded-sm"
                src={mytrip?.image}
                alt="trip"
              />
              <div className="flex flex-col items-start gap-2 ">
                <h1 className="font-bold md:text-md ">{mytrip?.place}</h1>
                <p className="">{mytrip?.details}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-600 text-2xl">No Trips found</p>
        )}
      </div>
    </>
  );
}

export default YourTrip;
