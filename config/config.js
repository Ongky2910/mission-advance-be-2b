require("dotenv").config();
const mysql2 = require("mysql2/promise");

const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10, 
});
console.log("Database connected");

// Verifikasi koneksi database
db.getConnection()
  .then((connection) => {
    console.log("Database connected");
    connection.release();  // Pastikan untuk melepaskan koneksi setelah digunakan
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
  
module.exports = {
  db,
  jwtSecret: process.env.JWT_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
};
