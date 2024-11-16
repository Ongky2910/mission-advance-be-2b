const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");

// Middleware untuk parsing JSON
app.use(express.json());
const authRoutes = require("./routes/authRoutes");

// routes "uploads"
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", uploadRoutes);

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);

// Memulai server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running di http://localhost:${PORT}`);
});
