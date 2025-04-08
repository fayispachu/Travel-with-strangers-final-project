const mongoose = require("mongoose");
const tripSchema = {
  image: String,
  place: String,
  details: String,
};
const CreateTrip = mongoose.model("createTrip", tripSchema);
module.exports = { CreateTrip };
