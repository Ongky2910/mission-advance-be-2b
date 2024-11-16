const nodemailer = require("nodemailer");
const { emailUser, emailPass } = require("../config/config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

async function sendVerificationEmail(email, token) {
  const mailOptions = {
    from: emailUser,
    to: email,
    subject: "Verifikasi Akun",
    text: `Klik tautan ini untuk verifikasi akun Anda: http://localhost:3000/api/auth/verify-email?token=${token}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email berhasil dikirim:", info.response);
  } catch (error) {
    console.error("Error pengiriman email:", error);
  }
}

module.exports = { sendVerificationEmail };
