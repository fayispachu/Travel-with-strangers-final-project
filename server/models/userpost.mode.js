const mongoose = require("mongoose");
const postSchema = {
  image: String,
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now() },
};
const CreateUserPost = mongoose.model("createpost", postSchema);
module.exports = { CreateUserPost };
