// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Mendapatkan semua user
router.get("/users", userController.getAllUsers);

// Mendapatkan user berdasarkan ID
router.get("/users/:id", userController.getOneUser);

// Menambah user baru
router.post("/users", userController.createUser);

// Mengupdate user berdasarkan ID
router.put("/users/:id", userController.updateUser);

// Menghapus user berdasarkan ID
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
