// userRoutes.js
const express = require("express");
const router = express.Router();
const { getAllUsersController, getOneUserController, createUserController, updateUserController, deleteUserController } = require("../controllers/userController");

console.log(getAllUsersController);
const  authenticateToken  = require("../middlewares/authMiddleware");


console.log("User Routes Loaded");


router.get("/users", getAllUsersController);
router.get("/users/:id", getOneUserController);
router.post("/users", createUserController);
router.put("/users/:id", updateUserController);
router.delete("/users/:id", deleteUserController);

// Endpoint untuk melihat profil user
router.get("/profile", authenticateToken, (req, res) => {
    res.json({
      message: "Ini adalah profil Anda",
      user: { id: 1, email: "user@example.com" }, // Data pengguna dummy
    });
  });
  

module.exports = router;
