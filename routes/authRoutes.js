const express = require("express");
const router = express.Router();
const { registerUser, loginUser, verifyEmail} = require("../controllers/authController");
const authenticateToken = require("../middlewares/authMiddleware"); 


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", verifyEmail); 
router.get("/protected", authenticateToken, (req, res) => res.json({ message: "Ini adalah endpoint terlindungi" }));

module.exports = router;
