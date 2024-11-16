const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

function authenticateToken(req, res, next) {
  // Ambil token dari header Authorization
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak, token tidak ada" });
  }

  // Verifikasi token dengan secret key
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      console.error("Token error:", err); // Tambahan log untuk debugging
      return res.status(403).json({ message: "Token tidak valid" });
    }

    // Menyimpan data user dari token ke req.user untuk digunakan di endpoint berikutnya
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
