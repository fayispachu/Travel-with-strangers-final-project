const express = require("express");

const userRouter = express.Router();
const tripRouter = express.Router();
const {
  createTrip,
  getOneTrip,
  getAllTrips,
  getMyTrip,
  UserPost,
} = require("../controller/createtrip.controller");

const {
  registerUser,
  loginData,
  getProfileFromtoken,
  getAllUsers,
  setProfile,
} = require("../controller/userAuthentication.controller");

const { authenticateUser } = require("../middleware/auth");

userRouter.post("/create", registerUser);
userRouter.post("/login", loginData);
userRouter.get("/profile", authenticateUser, getProfileFromtoken);
userRouter.get("/users", getAllUsers);
userRouter.put("/update/profile", authenticateUser, setProfile);

tripRouter.post(
  "/createtrip",

  authenticateUser,
  createTrip
);
tripRouter.get("/alltrips", getAllTrips);
tripRouter.post("/onetrip", getOneTrip);

tripRouter.get("/mytrip", authenticateUser, getMyTrip);
tripRouter.get("/createpost", authenticateUser, UserPost);

module.exports = { tripRouter, userRouter };
