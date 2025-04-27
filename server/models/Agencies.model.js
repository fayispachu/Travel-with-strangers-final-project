const mongoose = require("mongoose");
const agenciesAuthSchema = {
  profileImage: { type: String, default: "" },
  agencyName: String,
  email: String,
  phone: String,
  password: String,
  bio: String,
  websiteLink: String,
};
const AgenciesAuth = mongoose.model("Agency", agenciesAuthSchema);
module.exports = { AgenciesAuth };
