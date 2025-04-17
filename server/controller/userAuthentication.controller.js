const { User } = require("../models/userAuthentication.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const document = await User.findOne({ email });
    if (document) {
      return res.status(400).json({ msg: "User already exist" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPass });
    return res
      .status(201)
      .json({ msg: "Register successffull", User: newUser });
  } catch (error) {
    console.log("Error in register backend", error);
  }
};

const loginData = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const document = await User.findOne({ email });
    if (!document) {
      return res.status(400).json({ msg: "Account not found" });
    }

    const isPassVaild = await bcrypt.compare(password, document.password);
    if (!isPassVaild) {
      return res.status(400).json({ msg: "Password not found" });
    }
    const token = jwt.sign({ id: document._id }, process.env.JWT_SECRET);
    return res.status(201).json({ msg: "Login Successfull", token, document });
  } catch (error) {
    console.log(error, "Error in login data in controller");
  }
};

const getProfileFromtoken = async (req, res) => {
  try {
    const doc = req.user;
    return res.status(201).json({ msg: "Profile get success", doc });
  } catch (error) {
    console.log(error, "error in getprofile from token backend");
  }
};

module.exports = { registerUser, loginData, getProfileFromtoken };
