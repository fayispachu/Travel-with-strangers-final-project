const express = require("express");

const userRouter = express.Router();
const tripRouter = express.Router();
const {
  createTrip,
  getOneTrip,
  getAllTrips,
  getMyTrip,
  DeleteTrip,
} = require("../controller/createtrip.controller");

const {
  registerUser,
  loginData,
  getProfileFromtoken,
  getAllUsers,
  setProfile,
  forgotPassword,
  resetPassword,
  tripJoinedUser,
} = require("../controller/userAuthentication.controller");

const { authenticateUser } = require("../middleware/auth");

const {
  saveTripToUser,
  getSavedTrips,
} = require("../controller/saveTrip.controller");
userRouter.post("/create", registerUser);
userRouter.post("/login", loginData);
userRouter.get("/profile", authenticateUser, getProfileFromtoken);
userRouter.get("/users", getAllUsers);
userRouter.put("/update/profile", authenticateUser, setProfile);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);

userRouter.post("/save-trip", authenticateUser, saveTripToUser);
userRouter.get("/get-savedtrips", authenticateUser, getSavedTrips);

userRouter.get("/joineduser", authenticateUser, tripJoinedUser);

tripRouter.post(
  "/createtrip",

  authenticateUser,
  createTrip
);
tripRouter.get("/alltrips", getAllTrips);
tripRouter.get("/onetrip", getOneTrip);
tripRouter.delete("/delete/:id", authenticateUser, DeleteTrip);

tripRouter.get("/mytrip", authenticateUser, getMyTrip);

module.exports = { tripRouter, userRouter };
