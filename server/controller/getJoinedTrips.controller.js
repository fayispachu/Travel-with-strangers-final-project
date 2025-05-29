const Chat = require("../models/Chat");

const getJoinedTrips = async (req, res) => {
  try {
    const userId = req.user.id;
    const chats = await Chat.find({ members: userId }).populate("trip");
    const joinedTrips = chats.map((chat) => chat.trip).filter(Boolean);

    res.status(200).json({ success: true, joinedTrips });
  } catch (error) {
    console.error("Error getting joined trips:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getJoinedTrips };
