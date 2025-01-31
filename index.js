const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");


// Load environment variables
dotenv.config();

// Middleware untuk parsing JSON dan logging request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("uploads")); // Pastikan folder uploads bisa diakses
app.use(cors());


app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});




// Import Routes
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");

// Route Definitions
app.use("/api/upload", uploadRoutes); 
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
