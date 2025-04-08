const { CreateTrip } = require("../models/createtrip.model");


const createTrip = async (req, res) => {
  try {
    const { image, place, details } = req.body;
      
    if (!image || !place || !details) {
      return res
        .status(400)
        .json({ msg: "all field are required from backend create" });
    }
    const newTrip = await CreateTrip.create({
      trips: createTrip,
    });
    console.log(newTrip);

    res.status(201).json({ msg: "Successfully created Trip", newTrip });
  } catch (error) {
    console.log(error, "error in create trip backend");
  }
};
const getAllTrips = async (req, res) => {
  const allTrips = await CreateTrip.find();
  res.status(201).json({ msg: "Trips all get success", allTrips });
};

// const getOneTrip = async (req, res) => {
//   try {
//     const id = req.query.id;
//     if (!id) {
//       return res.status(400).json({ msg: "Id Required " });
//     }
//     console.log(id);
//     const trip = await CreateTrip.findById(id);
//     console.log(trip);
//     res.status(201).json({ msg: "Your Trip", trip });
//   } catch (error) {
//     console.log(error, "error in backend gettrip");
//   }
// };

module.exports = { createTrip, getAllTrips };
