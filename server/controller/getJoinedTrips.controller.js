const Chat = require("../models/Chat");

const getJoinedTrips = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all chats where this user is a member
    const chats = await Chat.find({ members: userId }).populate("trip");

    // Extract trip data from chats
    const joinedTrips = chats
      .map((chat) => chat.trip)
      .filter((trip) => trip !== null); // Filter out any missing trips

    res.status(200).json({
      success: true,
      joinedTrips,
    });
  } catch (error) {
    console.error("Error fetching joined trips:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getJoinedTrips };
