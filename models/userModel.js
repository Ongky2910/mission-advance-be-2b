const { db } = require("../config/config");

// Fungsi untuk mendapatkan semua user
const getAllUsers = async () => {
  try {
    const [results] = await db.query("SELECT * FROM user");
    return results;
  } catch (err) {
    throw err;
  }
};

// Fungsi untuk mendapatkan user berdasarkan ID
const getOneUser = async (userID) => {
  try {
    const [results] = await db.query("SELECT * FROM user WHERE UserID = ?", [userID]);
    return results;
  } catch (err) {
    throw err;
  }
};

// Fungsi untuk menambah user baru
const createUser = async (data) => {
  try {
    const [results] = await db.query("INSERT INTO user SET ?", data);
    return { message: "User created successfully", results };
  } catch (err) {
    throw err;
  }
};

// Fungsi untuk mengubah data user berdasarkan ID
const updateUser = async (userID, data) => {
  try {
    const [results] = await db.query("UPDATE user SET ? WHERE UserID = ?", [data, userID]);
    return { message: "User updated successfully", results };
  } catch (err) {
    throw err;
  }
};

// Fungsi untuk menghapus user berdasarkan ID
const deleteUser = async (userID) => {
  try {
    const [results] = await db.query("DELETE FROM user WHERE UserID = ?", [userID]);
    return { message: "User deleted successfully", results };
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllUsers, getOneUser, createUser, updateUser, deleteUser };
