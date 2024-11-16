const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

// Middleware untuk parsing JSON
app.use(express.json());
const authRoutes = require("./routes/authRoutes");

// routes multer
const multerRoutes = require("./routes/multerRoutes");

app.use("/api", multerRoutes);
// Menggunakan routes
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);

// Memulai server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running di http://localhost:${PORT}`);
});
