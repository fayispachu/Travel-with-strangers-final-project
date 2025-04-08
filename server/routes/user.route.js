const express = require("express");

const userRouter = express.Router();
const tripRouter = express.Router();
const {
  createTrip,
  // upload,
  // getOneTrip,
  getAllTrips,
} = require("../controller/createtrip.controller");

const {
  registerUser,
  loginData,
  getProfileFromtoken,
} = require("../controller/userauthentication.controller");
userRouter.post("/create", registerUser);
userRouter.post("/login", loginData, getProfileFromtoken);
userRouter.get("/", getProfileFromtoken);

tripRouter.post("/createdtrip", createTrip); //upload.single("image"),
tripRouter.get("/alltrips", getAllTrips);
// tripRouter.post("/tripdetails", getOneTrip);
module.exports = { tripRouter, userRouter };
