const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userAuthentication.model");

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

const getAllUsers = async (req, res) => {
  try {
    const { name } = req.query;
    const query = name ? { name: { $regex: name, $options: "i" } } : {};
    const users = await User.find(query).select("-password");
    return res.status(200).json({ msg: "All usesr get success", users });
  } catch (error) {
    console.log(error, "error from get all user backend");
  }
};

const setProfile = async (req, res) => {
  // const { imageUrl, userId } = req.body;
  const { profilepic } = req.body.profile;

  try {
    if (req.user) {
      const updateProfile = await User.findByIdAndUpdate(
        req.user._id,
        { profileImage: profilepic },
        { new: true }
      );
      return res.json({
        success: true,
        message: "User profile pic updated",
        data: updateProfile,
      });
    }
    // if (req.agency) {
    //   const updateProfile = await User.findByIdAndUpdate(
    //     req.agency._id,
    //     { profileImage: profilepic },
    //     { new: true }
    //   );
    //   return res.json({
    //     success: true,
    //     message: "Agency profile pic updated",
    //     data: updateProfile,
    //   });
    // }

    return res
      .status(200)
      .json({ msg: "Profile set successfully", updateProfile });
  } catch (error) {
    console.log(error, "error from backend profile image set");
    return res.status(500).json({ msg: "Error from backend setProfile" });
  }
};

module.exports = {
  registerUser,
  loginData,
  getProfileFromtoken,
  getAllUsers,
  setProfile,
};
