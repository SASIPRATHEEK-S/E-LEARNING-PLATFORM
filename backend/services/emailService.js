const nodemailer = require('nodemailer');
const config = require('../config/dbConfig');

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: Number(config.email.port) || 587,
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendOtpEmail = async ({ to, otp }) => {
  const mailOptions = {
    from: config.email.from,
    to,
    subject: 'Your OTP for E-Learning Platform Signup',
    text: `Your OTP is: ${otp}. It expires in 10 minutes.`,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendOtpEmail,
};