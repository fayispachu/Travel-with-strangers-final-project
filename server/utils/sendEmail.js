const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_GMAIL,
    pass: process.env.MY_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error("🚫 Email transporter error:", err.message);
  } else {
    console.log("✅ Email transporter is ready");
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.MY_GMAIL,
      to,
      subject,
      text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("📤 Email sent:", result.response);
  } catch (error) {
    console.error("❌ Email sending error:", error.message);
    throw error; // Propagate it up
  }
};

module.exports = sendEmail;
