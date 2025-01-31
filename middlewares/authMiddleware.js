const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token tidak valid" });
    }
    req.user = user;
    next(); // Lanjutkan ke rute berikutnya
  });
};

module.exports =  authenticateToken ;
