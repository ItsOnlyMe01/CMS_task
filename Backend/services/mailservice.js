const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (subject, text, receiverEmail) => {
  try {
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: receiverEmail,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.error("Error fetching admin email:", error);
  }
};

module.exports = { sendEmail };
