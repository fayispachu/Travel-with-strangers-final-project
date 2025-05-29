const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  image: String,
  place: String,
  details: String,
  date: Date,
  profile: String,
  name: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const CreateTrip = mongoose.models.createTrip || mongoose.model("createTrip", tripSchema);
module.exports = { CreateTrip };