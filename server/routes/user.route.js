const express = require("express");

const userRouter = express.Router();
const tripRouter = express.Router();
const {
  createTrip,
  getOneTrip,
  getAllTrips,
  getMyTrip,
} = require("../controller/createtrip.controller");

const {
  registerUser,
  loginData,
  getProfileFromtoken,
} = require("../controller/userauthentication.controller");

const { authenticateUser } = require("../middleware/auth");

userRouter.post("/create", registerUser);
userRouter.post("/login", loginData);
userRouter.get("/profile", authenticateUser, getProfileFromtoken);

tripRouter.post(
  "/createtrip",

  authenticateUser,
  createTrip
);
tripRouter.get("/alltrips", getAllTrips);
tripRouter.post("/onetrip", getOneTrip);

tripRouter.get("/mytrip", authenticateUser, getMyTrip);

module.exports = { tripRouter, userRouter };
