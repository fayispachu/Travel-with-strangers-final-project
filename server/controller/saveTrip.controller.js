const { User } = require("../models/userauthentication.model");
const saveTripToUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tripId } = req.body;

    if (!tripId) {
      return res.status(400).json({ msg: "Trip ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ msg: "User not found" });

    // Avoid duplicates
    const alreadySaved = user.savedTrips.some((id) => id.toString() === tripId);

    if (alreadySaved) {
      return res.status(400).json({ msg: "Trip already saved" });
    }

    user.savedTrips.push(tripId);
    await user.save();

    const populatedUser = await user.populate("savedTrips");
    res.status(200).json({ savedTrips: populatedUser.savedTrips });
  } catch (error) {
    console.log("Error in saveTripToUser:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getSavedTrips = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedTrips");
    if (!user) return res.status(400).json({ msg: "User not found" });

    res.status(200).json({ savedTrips: user.savedTrips });
  } catch (error) {
    console.log("Error in getSavedTrips:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { saveTripToUser, getSavedTrips };
