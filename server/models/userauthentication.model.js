const mongoose = require("mongoose");

const userAuthenticationSchema = {
  profileImage: { type: String, default: "" },
  name: String,
  email: String,
  password: String,
};

const User = mongoose.model("User", userAuthenticationSchema);

module.exports = { User };
