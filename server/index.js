// const fs = require("fs");
// const path = require("path");
// const uploadsDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }
const express = require("express");

const app = express();
const port = 4000;

const cors = require("cors");
app.use(cors());
require("dotenv").config();
app.use(express.json());
const mongoose = require("mongoose");
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
app.listen(port, () => {
  console.log(`Server running on port http://localhost:4000`);
});
