const express = require("express");
const chatRouter = express.Router();
const {
  joinGroupChat,
  getChatMembers,
  getChatMessages,
  exitGroup,
  addUserToChat,
  removeUserFromChat,
  getChatByTripId,
} = require("../controller/chatController");
const { getJoinedTrips } = require("../controller/getJoinedTrips.controller");
const { authenticateUser } = require("../middleware/auth");

chatRouter.post("/join", authenticateUser, joinGroupChat);
chatRouter.get("/:roomId/members", getChatMembers);
chatRouter.get("/:roomId/messages", getChatMessages);
chatRouter.post("/:roomId/exit", authenticateUser, exitGroup);
chatRouter.get("/joined-trips", authenticateUser, getJoinedTrips);
chatRouter.post("/:roomId/add-user", authenticateUser, addUserToChat);
chatRouter.post("/:roomId/remove-user", authenticateUser, removeUserFromChat);
chatRouter.get("/trip/:tripId", authenticateUser, getChatByTripId);
module.exports = chatRouter;
