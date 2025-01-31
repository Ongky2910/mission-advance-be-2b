const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, token) => {
  // Buat transporter untuk nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Ganti dengan email pengirim
      pass: process.env.EMAIL_PASS, // Ganti dengan password pengirim
    },
  });

  // Kirim email verifikasi
  const mailOptions = {
    from: `"My App" <${process.env.EMAIL_USER}>`, 
    to: email,
    subject: "Verifikasi Email Anda",
    text: `Klik link berikut untuk memverifikasi email Anda: http://localhost:3001/api/auth/verify?token=${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email verifikasi berhasil dikirim ke:", email);
  } catch (error) {
    console.error("Gagal mengirim email verifikasi:", error);
    throw new Error("Gagal mengirim email verifikasi");
  }
};

module.exports = { sendVerificationEmail };
