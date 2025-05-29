const mongoose = require("mongoose");
const Chat = require("../models/Chat");
const { CreateTrip } = require("../models/createtrip.model");
const Message = require("../models/Message");

const joinGroupChat = async (req, res) => {
  try {
    const { tripId } = req.body;
    const userId = req.user.id;

    if (!userId || !tripId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and Trip ID are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Trip ID format" });
    }

    const trip = await CreateTrip.findById(tripId);
    if (!trip) {
      return res
        .status(404)
        .json({ success: false, message: "Trip not found" });
    }

    let chat = await Chat.findOne({ trip: tripId });
    if (!chat) {
      chat = await Chat.create({ trip: tripId, members: [userId] });
      console.log("Created chat with ID:", chat._id);
    } else if (!chat.members.includes(userId)) {
      chat.members.push(userId);
      await chat.save();
    }

    if (!trip.members.includes(userId)) {
      trip.members.push(userId);
      await trip.save();
    }

    await chat.populate("trip");
    res.status(200).json({
      success: true,
      message: "Joined group successfully",
      chat,
      room: chat._id,
      members: chat.members,
      trip: chat.trip,
    });
  } catch (err) {
    console.error("Error joining group chat:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error: " + err.message });
  }
};

const getChatMembers = async (req, res) => {
  try {
    const { roomId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Room ID format" });
    }

    const chat = await Chat.findById(roomId).populate(
      "members",
      "name username isAdmin" // Include isAdmin
    );
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    res.status(200).json({ success: true, members: chat.members });
  } catch (err) {
    console.error("Error fetching chat members:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error: " + err.message });
  }
};

const getChatMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Room ID format" });
    }

    const messages = await Message.find({ room: roomId })
      .sort("createdAt")
      .populate("sender", "name username");
    res.status(200).json({ success: true, messages });
  } catch (err) {
    console.error("Error fetching chat messages:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages: " + err.message,
    });
  }
};

const exitGroup = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Room ID format" });
    }

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

    chat.members = chat.members.filter(
      (memberId) => memberId.toString() !== userId
    );
    await chat.save();

    const trip = await CreateTrip.findById(chat.trip);
    if (trip && trip.members.includes(userId)) {
      trip.members = trip.members.filter(
        (memberId) => memberId.toString() !== userId
      );
      await trip.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Exited group successfully" });
  } catch (err) {
    console.error("Error exiting group:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error: " + err.message });
  }
};

const addUserToChat = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { userId } = req.body;
    const adminId = req.user.id;

    if (
      !mongoose.Types.ObjectId.isValid(roomId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Room ID or User ID format" });
    }

    const admin = await mongoose.model("User").findById(adminId);
    if (!admin || !admin.isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "Only admins can add users" });
    }

    const chat = await Chat.findById(roomId);
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    if (chat.members.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "User already in chat" });
    }

    chat.members.push(userId);
    await chat.save();

    const trip = await CreateTrip.findById(chat.trip);
    if (trip && !trip.members.includes(userId)) {
      trip.members.push(userId);
      await trip.save();
    }

    const addedUser = await mongoose
      .model("User")
      .findById(userId)
      .select("name username");
    res.status(200).json({
      success: true,
      message: "User added successfully",
      user: addedUser,
    });
  } catch (err) {
    console.error("Error adding user to chat:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error: " + err.message });
  }
};

const removeUserFromChat = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { userId } = req.body;
    const adminId = req.user.id;

    if (
      !mongoose.Types.ObjectId.isValid(roomId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Room ID or User ID format" });
    }

    if (userId === adminId) {
      return res
        .status(400)
        .json({ success: false, message: "Admins cannot remove themselves" });
    }

    const admin = await mongoose.model("User").findById(adminId);
    if (!admin || !admin.isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "Only admins can remove users" });
    }

    const chat = await Chat.findById(roomId);
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    if (!chat.members.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "User not in chat" });
    }

    chat.members = chat.members.filter(
      (memberId) => memberId.toString() !== userId
    );
    await chat.save();

    const trip = await CreateTrip.findById(chat.trip);
    if (trip && trip.members.includes(userId)) {
      trip.members = trip.members.filter(
        (memberId) => memberId.toString() !== userId
      );
      await trip.save();
    }

    res
      .status(200)
      .json({ success: true, message: "User removed successfully" });
  } catch (err) {
    console.error("Error removing user from chat:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error: " + err.message });
  }
};

module.exports = {
  joinGroupChat,
  getChatMembers,
  getChatMessages,
  exitGroup,
  addUserToChat,
  removeUserFromChat,
};
