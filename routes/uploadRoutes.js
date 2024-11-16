const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { db } = require("../config/config");

// Endpoint upload file dan simpan ke database
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path; // Lokasi file yang di-upload
    const userId = req.body.userId;

    // Simpan informasi file ke database
    const [result] = await db.query("UPDATE user SET image = ? WHERE userId = ?", [filePath, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json({
      message: "File uploaded and saved to database successfully",
      file: req.file,
    });
  } catch (error) {
    res.status(500).json({ message: "File upload failed", error: error.message });
  }
});

module.exports = router;
