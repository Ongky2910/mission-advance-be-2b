// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { getAllUsersController, getOneUserController, createUserController, updateUserController, deleteUserController } = require("../controllers/userController");

router.get("/users", getAllUsersController);
router.get("/users/:id", getOneUserController);
router.post("/users", createUserController);
router.put("/users/:id", updateUserController);
router.delete("/users/:id", deleteUserController);

module.exports = router;
