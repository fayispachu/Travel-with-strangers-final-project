const { CreateTrip } = require("../models/createtrip.model");
const { User } = require("../models/userauthentication.model");

const createTrip = async (req, res) => {
  try {
    const { image, place, details, date } = req.body;

    if (!image || !place || !details || !date) {
      return res
        .status(400)
        .json({ msg: "All field are required from backend create" });
    }
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ msg: "User not found server Create trip " });
    }

    const newTrip = await CreateTrip.create({
      image,
      place,
      details,
      date,
      profile: user.profile,
      name: user.name,
      createdAt: Date.now(),
      createdBy: req.user.id,
    });
    console.log(newTrip, "Newtrip");

    res.status(201).json({ msg: "Successfully created Trip", newTrip });
  } catch (error) {
    console.log(error, "error in create trip backend");
    res.status(500).json({ msg: "create trip server error" });
  }
};

const getAllTrips = async (req, res) => {
  try {
    const { place } = req.query;

    const query = place ? { place: { $regex: place, $options: "i" } } : {};
    const allTrips = await CreateTrip.find(query).sort({ createdAt: -1 });
    res.status(200).json({ msg: "Trips all get success", allTrips });
  } catch (error) {
    console.log(error, "error from backend get all trips");
    res.status(400).json({ msg: "server get all error" });
  }
};

const getMyTrip = async (req, res) => {
  try {
    const id = req.user.id;
    console.log("User id :", id);
    if (!id) {
      return res.status(404).json({ msg: "id not found backend getMyTrip " });
    }

    const myTrip = await CreateTrip.find({ createdBy: id }).sort({
      createdAt: -1,
    });
    // console.log(myTrip);
    if (!myTrip || myTrip.length === 0) {
      return res.status(404).json({ msg: "No trip fount from this user " });
    }
    res.status(200).json({ msg: "get my trip success", myTrip });
  } catch (error) {
    res.status(500).json({ msg: "server get my trip error" });

    console.log(error, "error from backend my trip");
  }
};

const getOneTrip = async (req, res) => {
  try {
    const id = req.query.id;
    console.log("Received trip id:", id); // Log the id to check if it's coming correctly

    if (!id) {
      return res.status(404).json({ msg: "Trip ID not provided" });
    }

    const trip = await CreateTrip.findById(id);

    if (!trip) {
      return res.status(400).json({ msg: "GetOne trip id is notfound" });
    }
    console.log("Trip details:", trip);

    if (!trip) {
      return res.status(404).json({ msg: "Trip not found" });
    }

    res.status(200).json({ msg: "Your Trip", trip });
  } catch (error) {
    console.log(error, "Error in backend getOneTrip");
    res.status(500).json({ msg: "Server error while fetching the trip" });
  }
};

const DeleteTrip = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Deleting trip with ID:", id);
    const deletedTrip = await CreateTrip.findByIdAndDelete(id);
    if (!deletedTrip) {
      return res.status(404).json({ msg: "Trip not found" });
    }
    return res.status(200).json({ msg: "Trip deleted", deletedTrip });
  } catch (error) {
    console.log("Error deleting trip:", error);
    return res.status(500).json({ msg: "Server error during deletion" });
  }
};

module.exports = {
  DeleteTrip,
  createTrip,
  getAllTrips,
  getOneTrip,
  getMyTrip,
};
