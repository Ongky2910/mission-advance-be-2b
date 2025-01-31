const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../services/emailService");
const { db } = require("../config/config");
const { validateRegistration, validateLogin } = require("../utils/validation");


// Registrasi pengguna dan kirim email verifikasi
async function registerUser(req, res) {
  const { email, password } = req.body;

  try {
    // Periksa apakah email sudah terdaftar menggunakan query
    const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
    const existingUser = rows[0];

    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate token verifikasi
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Simpan pengguna baru dengan verification_token
    const [result] = await db.query(
      "INSERT INTO user (email, password, verification_token) VALUES (?, ?, ?)",
      [email, hashedPassword, verificationToken]
    );

    console.log("User registered:", result);

    // Kirim email verifikasi
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: "Registrasi berhasil. Periksa email Anda untuk verifikasi akun.",
    });
  } catch (error) {
    console.error("Error saat registrasi:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat registrasi" });
  }
}

// Endpoint untuk memverifikasi email
const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    // Verifikasi token menggunakan JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Cari user berdasarkan email
    const query = "SELECT * FROM user WHERE email = ?";
    const [rows] = await db.query(query, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    const user = rows[0];

    // Cek apakah sudah diverifikasi
    if (user.isVerified) {
      return res.status(400).json({ message: "Akun sudah diverifikasi" });
    }

    // Tandai pengguna sebagai terverifikasi
    const updateQuery = "UPDATE user SET isVerified = ? WHERE email = ?";
    await db.query(updateQuery, [true, email]);

    return res.status(200).json({ message: "Email Verified Successfully" });
  } catch (error) {
    console.error("Error saat verifikasi email:", error);
    return res.status(500).json({ message: "Terjadi kesalahan saat verifikasi email" });
  }
}

// Login pengguna
async function loginUser(req, res) {
  const { email, password } = req.body;
  console.log("Login request received with:", { email, password });

  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Query untuk mendapatkan data pengguna berdasarkan email
  const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
  const user = rows[0];

  if (!user)
    return res.status(404).json({ message: "Pengguna tidak ditemukan" });

  // Cek password dengan bcrypt
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Password salah" });

  // Jika berhasil, buatkan token JWT
  const token = jwt.sign({ id: user.UserID, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Login berhasil", token });
}

module.exports = { registerUser, loginUser, verifyEmail };
