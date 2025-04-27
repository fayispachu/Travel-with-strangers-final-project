const { AgenciesAuth } = require("../models/Agencies.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register an agency
const registerAgencie = async (req, res) => {
  try {
    const { profileImage, agencyName, email, phone, password } = req.body;

    const existingAgency = await AgenciesAuth.findOne({ email });
    if (existingAgency) {
      return res.status(400).json({ msg: "Agencies already exist" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newAgencie = await AgenciesAuth.create({
      profileImage,
      email,
      password: hashedPass,
      agencyName,
      phone,
    });
    return res
      .status(201)
      .json({ msg: "Registration successful", agency: newAgencie });
  } catch (error) {
    console.log("Error in register backend", error);
    return res.status(500).json({ msg: "Error in registration" });
  }
};

// Agency login
const loginDataAgencie = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("agency Login attempt:", req.body);

    const agency = await AgenciesAuth.findOne({ email });
    if (!agency) {
      return res.status(400).json({ msg: "Account not found" });
    }

    const isPassValid = await bcrypt.compare(password, agency.password);
    if (!isPassValid) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign({ id: agency._id }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ msg: "Login successful", token, document: agency });
  } catch (error) {
    console.log("Error in login data in agency controller", error);
    return res.status(500).json({ msg: "Login failed" });
  }
};

// Get profile from token
const getProfileFromToken = async (req, res) => {
  try {
    const agency = req.agency;
    return res
      .status(200)
      .json({ msg: "Profile retrieved successfully", agency });
  } catch (error) {
    console.log("Error in get profile from token backend", error);
    return res.status(500).json({ msg: "Error retrieving profile" });
  }
};

// Get all agencies
const getAllAgencies = async (req, res) => {
  try {
    const { agencyName } = req.query;
    const query = agencyName
      ? { agencyName: { $regex: agencyName, $options: "i" } }
      : {};
    const agency = await AgenciesAuth.find(query).select("-password");
    return res
      .status(200)
      .json({ msg: "Agencies retrieved successfully", agency });
  } catch (error) {
    console.log("Error from get all Agencies backend", error);
    return res.status(500).json({ msg: "Error fetching agencies" });
  }
};

module.exports = {
  registerAgencie,
  loginDataAgencie,
  getProfileFromToken,
  getAllAgencies,
};
