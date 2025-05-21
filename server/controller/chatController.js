// controllers/chatController.js
const Chat = require("../models/Chat");
const { CreateTrip } = require("../models/createtrip.model");
const Message = require("../models/Message");

const joinGroupChat = async (req, res) => {
  try {
    const { tripId } = req.body;
    const userId = req.user.id;

    if (!tripId) {
      return res
        .status(400)
        .json({ success: false, message: "Trip ID is required" });
    }

    const trip = await CreateTrip.findById(tripId);
    if (!trip) {
      return res
        .status(404)
        .json({ success: false, message: "Trip not found" });
    }

    let chat = await Chat.findOne({ trip: tripId });

    if (!chat) {
      chat = await Chat.create({
        trip: tripId,
        members: [userId],
      });
    } else {
      if (!chat.members.includes(userId)) {
        chat.members.push(userId);
        await chat.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Joined group",
      chat,
      room: chat._id,
      members: chat.members,
    });
  } catch (err) {
    console.error("Error joining group chat:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getChatMembers = async (req, res) => {
  try {
    const { roomId } = req.params;
    const chat = await Chat.findById(roomId).populate(
      "members",
      "name username"
    );

    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    res.status(200).json({ success: true, member: chat.members });
  } catch (err) {
    console.error("Error fetching chat members:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getChatMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ room: roomId })
      .sort("createdAt")
      .populate("sender", "name username");
    res.status(200).json({ success: true, messages });
  } catch (err) {
    console.error("Error fetching chat messages:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch messages" });
  }
};

// New: User leaves the group chat
const exitGroup = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(roomId);
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    if (!chat.members.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "User not a member of the chat" });
    }

    // Remove user from members array
    chat.members = chat.members.filter(
      (memberId) => memberId.toString() !== userId
    );
    await chat.save();

    res
      .status(200)
      .json({ success: true, message: "Exited group successfully" });
  } catch (err) {
    console.error("Error exiting group:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  joinGroupChat,
  getChatMembers,
  getChatMessages,
  exitGroup,
};
