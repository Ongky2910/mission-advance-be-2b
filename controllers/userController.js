const { getAllUsers, getOneUser, createUser, updateUser, deleteUser } = require("../models/userModel");

// Controller untuk mendapatkan semua user
const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller untuk mendapatkan satu user berdasarkan ID
const getOneUserController = async (req, res) => {
  try {
    const user = await getOneUser(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller untuk membuat user baru
const createUserController = async (req, res) => {
  try {
    const result = await createUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller untuk mengupdate user berdasarkan ID
const updateUserController = async (req, res) => {
  try {
    const result = await updateUser(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller untuk menghapus user berdasarkan ID
const deleteUserController = async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsersController,
  getOneUserController,
  createUserController,
  updateUserController,
  deleteUserController,
};
