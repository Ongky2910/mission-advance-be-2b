const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { sendVerificationEmail } = require("../services/emailService");
const { jwtSecret, db } = require("../config/config");
const { validateRegistration, validateLogin } = require("../utils/validation");

async function registerUser(req, res) {
  const { email, password } = req.body;

  const { error } = validateRegistration(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = uuidv4();

  try {
    const [result] = await db.query("INSERT INTO user ( email, password, verification_token) VALUES (?, ?, ?)", [email, hashedPassword, verificationToken]);

    try {
      await sendVerificationEmail(email, verificationToken);
      res.status(201).json({ message: "Registrasi berhasil, cek email Anda untuk verifikasi" });
    } catch (emailError) {
      console.error("Gagal mengirim email verifikasi:", emailError);
      res.status(500).json({ message: "Registrasi berhasil, tetapi gagal mengirim email verifikasi" });
    }
  } catch (error) {
    console.error("Registrasi gagal:", error);
    res.status(500).json({ message: "Registrasi gagal", error });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
  const user = rows[0];
  if (!user) return res.status(404).json({ message: "Pengguna tidak ditemukan" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Password salah" });

  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: "1h" });
  res.status(200).json({ message: "Login berhasil", token });
}

module.exports = { registerUser, loginUser };
