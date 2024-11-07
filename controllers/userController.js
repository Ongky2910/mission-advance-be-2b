// controllers/userController.js
const userModel = require("../models/userModel");

// Mendapatkan semua user
const getAllUsers = async (req, res) => {
  try {
    const result = await userModel.getAllUsers();
    return res.status(200).json({
      code: 200,
      message: "All users",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const userID = req.params.id; // Ambil userID dari parameter URL
    const result = await userModel.getOneUser(userID); // Berikan userID ke fungsi getOneUser
    return res.status(200).json({
      code: 200,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

// Menambah user baru
// Membuat user baru
const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const result = await userModel.createUser(newUser);
    res.status(201).json({
      code: 201,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

// Mengupdate user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await userModel.updateUser(id, updatedData);
    res.status(200).json({
      code: 200,
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

// Menghapus user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userModel.deleteUser(id);
    res.status(200).json({
      code: 200,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

module.exports = { getAllUsers, getOneUser, createUser, updateUser, deleteUser };
