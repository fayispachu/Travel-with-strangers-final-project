const mongoose = require("mongoose");

const userAuthenticationSchema = {
  profileImage: { type: String, default: "" },
  name: String,
  email: String,
  password: String,
  instagram: { type: String, default: "" }, // New: Instagram link
  whatsapp: { type: String, default: "" },
};

const User = mongoose.model("User", userAuthenticationSchema);

module.exports = { User };
