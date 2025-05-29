const mongoose = require("mongoose");

const userAuthenticationSchema = new mongoose.Schema({
  profileImage: { type: String, default: "" },
  name: String,
  email: String,
  password: String,
  instagram: { type: String, default: "" },
  whatsapp: { type: String, default: "" },
  savedTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: "createTrip" }],
  joinedTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: "createTrip" }],
  isAdmin:{type:Boolean, default:false}
});

const User =
  mongoose.models.User || mongoose.model("User", userAuthenticationSchema);
module.exports = { User };
