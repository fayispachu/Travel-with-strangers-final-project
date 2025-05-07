const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();


const transporter  = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASS,
    }
})

exports.sendOtp = async (email)