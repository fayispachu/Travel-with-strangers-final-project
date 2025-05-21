const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("./models/Message");

dotenv.config();

const app = express();
const server = http.createServer(app);

// Models
const Chat = require("./models/Chat"); // ✅ required for Socket.IO events

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
const { userRouter, tripRouter } = require("./routes/user.route");
const chatRouter = require("./routes/chatRoutes");
const { User } = require("./models/userauthentication.model");
// const { joinedRouter } = require("./routes/joined.route");
// app.use("/api/user", joinedRouter);

app.use("/api/user", userRouter);
app.use("/api/trip", tripRouter);
app.use("/api/chat", chatRouter);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// JWT Auth for Socket.IO
io.use(async (socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("No token provided"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("name username");
    if (!user) return next(new Error("User not found"));

    socket.user = user;
    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
});

// Socket.IO events
// server.js or wherever socket.io setup is

io.on("connection", (socket) => {
  console.log(
    `🔌 User connected: ${socket.id} (${socket.user?.name || "Guest"})`
  );

  socket.on("join_room", async (roomId) => {
    try {
      const chat = await Chat.findById(roomId);
      if (!chat) return socket.emit("error", "Chat room not found");

      if (!chat.members.includes(socket.user._id)) {
        return socket.emit("error", "Not authorized for this room");
      }

      socket.join(roomId);
      console.log(`📥 ${socket.user.name} joined room: ${roomId}`);

      socket.to(roomId).emit("user_joined", {
        userId: socket.user._id,
        name: socket.user.name,
      });
    } catch (err) {
      console.error("Room join error:", err);
      socket.emit("error", "Failed to join room");
    }
  });

  socket.on("send_message", async ({ room, message }, callback) => {
    try {
      const chat = await Chat.findById(room);
      if (!chat || !chat.members.includes(socket.user._id)) {
        return callback({ status: "error", message: "Not authorized" });
      }

      const msgData = {
        text: message,
        sender: socket.user._id,
        room: room,
      };

      // Save message to DB
      const savedMessage = await Message.create(msgData);

      // Populate sender name for broadcast
      const populatedMessage = await savedMessage.populate(
        "sender",
        "name username"
      );

      socket.to(room).emit("receive_message", {
        text: populatedMessage.text,
        sender:
          populatedMessage.sender.name || populatedMessage.sender.username,
        senderId: populatedMessage.sender._id,
        timestamp: populatedMessage.createdAt,
      });

      callback({ status: "ok" });
    } catch (err) {
      console.error("Message send error:", err);
      callback({ status: "error", message: "Failed to send message" });
    }
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.CONN_STRING)
  .then(() => {
    console.log("MongoDB Connected");
    server.listen(4000, () => {
      console.log("Server running on port 4000");
    });
  })
  .catch((err) => console.error("Mongo Error:", err));
