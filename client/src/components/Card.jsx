import React, { useEffect, useState } from "react";
import userProfile from "../assets/boy.png";

import axios from "axios";
function Card() {
  const [trip, setTrip] = useState("");
  // const handleTrip = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:4000/api/trip/tripdetails",
  //       {
  //         id: { id: trip._id },
  //       }
  //     );
  //     setTrip(data.trip);

  //     console.log(data);
  //   } catch (error) {
  //     console.log(error, "error in Card getTrip");
  //   }
  // };

  const handleTrips = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/trip/alltrips"
      );
      setTrip(data.allTrips);

      console.log(data.allTrips);
    } catch (error) {
      console.log(error, "error in Card getTrip");
    }
  };
  useEffect(() => {
    handleTrips();
  }, []);

  return (
    <>
      <div className="md:flex hidden items-center justify-center  rounded-md  ">
        <div className="md:w-96 w-[90%] bg-white md:h-[60vh] h-[62vh]  rounded-md drop-shadow-xl gap-3 flex flex-col md:p-6 px-5 py-4   ">
          <div className=" flex flex-row items-start gap-2">
            <img className="" src={userProfile} alt="" />
            <h1 className="font-bold text-lg">Fayiz.k</h1>
          </div>
          <img
            className="md:w-[100%]  md:h-36 h-24 rounded-md"
            src={trip?.image}
            alt="trip"
          />
          <div className="flex flex-col items-start gap-2 ">
            <h1 className="font-bold md:text-lg ">{trip?.place}</h1>
            <p className="">{trip?.details}</p>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Card;
