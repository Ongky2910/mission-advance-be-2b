const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

// Middleware untuk parsing JSON
app.use(express.json());

// Menggunakan routes
app.use("/api", userRoutes);

// Memulai server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
