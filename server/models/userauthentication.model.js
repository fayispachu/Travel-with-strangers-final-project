const mongoose = require("mongoose");

const userAuthenticationSchema = new mongoose.Schema({
  profileImage: { type: String, default: "" },
  name: String,
  email: String,
  password: String,
  savedTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: "createTrip" }],
  isAdmin: { type: Boolean, default: false }, // Optional: for global admin status
});

const User = mongoose.models.User || mongoose.model("User", userAuthenticationSchema);
module.exports = { User };