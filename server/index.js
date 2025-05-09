const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
// connection socket
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // join room
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room :${room}`);
  });

  /// send message
socket.on("send_message", ({ room, message }) => {
  io.to(room).emit("receive_message", message);
});
  // gandle disconnect

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id} `);
  });
});

// Middleware
app.use(express.json());

mongoose
  .connect(process.env.CONN_STRING)
  .then(() => {
    console.log("mongo connection success");
  })
  .catch(() => {
    console.log("Error found in mongo connection");
  });

const { tripRouter, userRouter } = require("./routes/user.route");

app.use("/api/user", userRouter);
app.use("/api/trip", tripRouter);

// soc

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
