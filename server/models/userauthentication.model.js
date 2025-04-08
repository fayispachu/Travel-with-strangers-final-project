const mongoose = require("mongoose");

const userAuthenticationSchema = {
  name: String,
  email: String,
  password: String,
};
const User = mongoose.model("user", userAuthenticationSchema);
module.exports = { User };
