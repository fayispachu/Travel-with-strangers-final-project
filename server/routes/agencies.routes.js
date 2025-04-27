const express = require("express");
const agenciesRouter = express.Router();

const { authenticateUser } = require("../middleware/auth");
const {
  registerAgencie,
  loginDataAgencie,
  getProfileFromToken,
  getAllAgencies,
} = require("../controller/agenciesAuth.controller");

agenciesRouter.post("/register", registerAgencie);
agenciesRouter.post("/login", loginDataAgencie);
agenciesRouter.get("/profile", authenticateUser, getProfileFromToken);
agenciesRouter.get("/all", getAllAgencies);

module.exports = { agenciesRouter };
