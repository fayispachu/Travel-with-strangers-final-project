const express = require("express");

const app = express();

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

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
