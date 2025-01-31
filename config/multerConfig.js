const fs = require("fs");
const multer = require("multer");
const path = require("path");

// Cek apakah folder uploads ada, jika tidak buat
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  console.log("Creating 'uploads' directory...");
  fs.mkdirSync(uploadDir);
}

// Konfigurasi storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("🚀 Storage Middleware Executed");
    console.log("Uploading file to:", uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log("✅ File received:", file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log("Generated filename:", uniqueSuffix + path.extname(file.originalname));
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});


// Filter file hanya menerima file gambar
const fileFilter = (req, file, cb) => {
  console.log("✅ File diterima:", file.originalname);
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    console.log("✅ File type is valid.");
    cb(null, true);
  } else {
    console.log("❌ Invalid file type:", file.mimetype);
    cb(new Error("File harus berupa gambar dengan format JPEG, JPG, PNG, atau GIF"));
  }
};


// Membuat instance multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Maksimal ukuran file 2MB
  fileFilter: (req, file, cb) => {
    if (!file) {
      console.log("❌ Tidak ada file yang diterima oleh multer!");
      return cb(new Error("File tidak ditemukan!"), false);
    }

    console.log("✅ File diterima:", file.originalname);
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      console.log("✅ File type is valid.");
      cb(null, true);
    } else {
      console.log("❌ Invalid file type:", file.mimetype);
      cb(new Error("File harus berupa gambar dengan format JPEG, JPG, PNG, atau GIF"));
    }
  },
});


module.exports = upload;
