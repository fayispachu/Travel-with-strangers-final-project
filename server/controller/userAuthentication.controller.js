const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail"); // ← Add this line
const { User } = require("../models/userauthentication.model");

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

const tripJoinedUser = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(201).json({ msg: "Profile get success", userData });
  } catch (error) {
    console.log(error, "error in tripJoinedUser from token backend");
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

    return res
      .status(200)
      .json({ msg: "Profile set successfully", updateProfile });
  } catch (error) {
    console.log(error, "error from backend profile image set");
    return res.status(500).json({ msg: "Error from backend setProfile" });
  }
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    console.log("📩 Forgot password requested for:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    console.log("🔗 Reset link generated:", resetLink);

    await sendEmail(email, "Reset Your Password", `Click here: ${resetLink}`);

    res.status(200).json({ message: "Reset email sent" });
  } catch (error) {
    console.error("🔥 Forgot Password Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err.message);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
  registerUser,
  loginData,
  getProfileFromtoken,
  getAllUsers,
  setProfile,
  tripJoinedUser,
};
