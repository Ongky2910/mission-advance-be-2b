// models/userModel.js
const db = require("../connection/db");

// Fungsi getallusers untuk mendapatkan semua user
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM user", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Fungsi getoneuser untuk mendapatkan user berdasarkan ID
getOneUser = (userID) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM user WHERE UserID = ?", [userID], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Fungsi CREATE untuk menambah user baru
const createUser = (data) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO user SET ?", data, (err, results) => {
      if (err) return reject(err);
      resolve({ message: "User created successfully", results });
    });
  });
};

// Fungsi UPDATE untuk mengubah data user berdasarkan ID
const updateUser = (userID, data) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE user SET ? WHERE UserID = ?", [data, userID], (err, results) => {
      if (err) return reject(err);
      resolve({ message: "User updated successfully", results });
    });
  });
};

// Fungsi DELETE untuk menghapus user berdasarkan ID
const deleteUser = (userID) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM user WHERE UserID = ?", [userID], (err, results) => {
      if (err) return reject(err);
      resolve({ message: "User deleted successfully", results });
    });
  });
};

module.exports = { getAllUsers, getOneUser, createUser, updateUser, deleteUser };
