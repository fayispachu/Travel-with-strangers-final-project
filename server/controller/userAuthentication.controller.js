const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userAuthentication.model");
const nodemailer = require("nodemailer");
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const document = await User.findOne({ email });
    if (document) {
      return res.status(400).json({ msg: "User already exist" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPass });
    console.log("Saving user:", newUser);

    return res
      .status(201)
      .json({ msg: "Register successffull", User: newUser });
  } catch (error) {
    console.log("Error in register backend", error);

    return res.status(400).json({ msg: "Register faild ", error });
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
  const { imageUrl, userId } = req.body;

  try {
    if (req.user) {
      const updateProfile = await User.findByIdAndUpdate(
        req.user._id,
        { profileImage: imageUrl },
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
const forgotpassword = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the request body

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    console.log("User found:", checkUser);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Generated token:", token);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASS,
      },
    });

    const receiver = {
      from: process.env.MY_GMAIL,
      to: email,
      subject: "Password Reset Request",
      text: `Click on this link to reset your password: ${process.env.CLIENT_URL}/${token}`,
    };

    console.log("Sending email to:", email);

    await transporter.sendMail(receiver);
    return res.status(200).json({ msg: "Password reset email sent" });
  } catch (error) {
    console.log(error, "Error in forgotpassword");
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  forgotpassword,
  registerUser,
  loginData,
  getProfileFromtoken,
  getAllUsers,
  setProfile,
};
