const mongoose = require("mongoose");
const tripSchema = {
  image: String,
  place: String,
  details: String,
  date: Date,
  profile: String,
  name: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now() },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // <-- ADD THIS
};
const CreateTrip = mongoose.model("createTrip", tripSchema);
module.exports = { CreateTrip };
