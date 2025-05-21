const jwt = require("jsonwebtoken");
const { User } = require("../models/userauthentication.model");

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ msg: "Invaild token" });
      }
      const user = await User.findById(decodedToken.id);
      if (user) {
        req.user = user;

        return next();
      }
    });
  } catch (error) {
    console.log(error, "error in auth jwt");
    return res.status(401).json({ msg: "internal server error in jwt auth" });
  }
};
module.exports = { authenticateUser };
