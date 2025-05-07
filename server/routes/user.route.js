const express = require("express");

const userRouter = express.Router();
const tripRouter = express.Router();
const {
  createTrip,
  getOneTrip,
  getAllTrips,
  getMyTrip,
  UserPost,
  DeleteTrip,
} = require("../controller/createtrip.controller");

const {
  registerUser,
  loginData,
  getProfileFromtoken,
  getAllUsers,
  setProfile,
  forgotpassword,
} = require("../controller/userAuthentication.controller");

const { authenticateUser } = require("../middleware/auth");

userRouter.post("/create", registerUser);
userRouter.post("/login", loginData);
userRouter.get("/profile", authenticateUser, getProfileFromtoken);
userRouter.get("/users", getAllUsers);
userRouter.put("/update/profile", authenticateUser, setProfile);
userRouter.post("/forgot-password", forgotpassword);

tripRouter.post(
  "/createtrip",

  authenticateUser,
  createTrip
);
tripRouter.get("/alltrips", getAllTrips);
tripRouter.get("/onetrip", getOneTrip);
tripRouter.delete("/delete/:id", authenticateUser, DeleteTrip);

tripRouter.get("/mytrip", authenticateUser, getMyTrip);
tripRouter.post("/createpost", authenticateUser, UserPost);

module.exports = { tripRouter, userRouter };
