const { CreateTrip } = require("../models/createtrip.model");
const { User } = require("../models/userAuthentication.model");

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
    console.log(newTrip);

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
    res.status(200).json(searchTrips);
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
    if (!id) {
      return res.status(404).json({ msg: "noooo id from backend " });
    }
    console.log(id);
    const trip = await CreateTrip.findById(id);
    console.log(trip);
    if (!trip) {
      return res.status(404).json({ msg: "Trip ton found" });
    }
    res.status(200).json({ msg: "Your Trip", trip });
  } catch (error) {
    console.log(error, "error in backend gettrip");
    res.status(500).json({ msg: "server error get one" });
  }
};

module.exports = {
  createTrip,
  getAllTrips,
  getOneTrip,
  getMyTrip,
};
