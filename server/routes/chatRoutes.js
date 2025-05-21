// routes/chatRoutes.js
const express = require("express");
const chatRouter = express.Router();
const {
  joinGroupChat,
  getChatMembers,
  getChatMessages,
  exitGroup,
} = require("../controller/chatController");
const { authenticateUser } = require("../middleware/auth");
const { getJoinedTrips } = require("../controller/getJoinedTrips.controller");

chatRouter.post("/join", authenticateUser, joinGroupChat);
chatRouter.get("/:roomId/members", getChatMembers);
chatRouter.get("/:roomId/messages", getChatMessages);
chatRouter.post("/:roomId/exit", authenticateUser, exitGroup);

chatRouter.get("/joined-trips", authenticateUser, getJoinedTrips);

module.exports = chatRouter;
