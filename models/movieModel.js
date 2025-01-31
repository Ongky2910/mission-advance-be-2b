const { db } = require("../config/config");

const getAllMovies = async (query) => {
  try {
    console.log("Received query parameters:", query); // Log untuk melihat query yang diterima
    let sql = "SELECT * FROM movies WHERE 1=1"; // WHERE 1=1 agar query dinamis
    let values = [];

    // **1. Filtering (WHERE)**
    if (query.genre) {
      sql += " AND genre = ?";
      values.push(query.genre.trim()); // Menghapus karakter ekstra seperti newline
    }
    if (query.year) {
      sql += " AND release_year = ?";
      values.push(query.year.trim()); // Menghapus karakter ekstra seperti newline
    }
    if (query.rating) {
      sql += " AND rating >= ?";
      values.push(query.rating);
    }

    // **2. Searching (LIKE)**
    if (query.search) {
      sql += " AND (title LIKE ? OR description LIKE ?)";
      values.push(`%${query.search}%`, `%${query.search}%`);
    }

    // **3. Sorting (ORDER BY)**
    if (query.sortBy) {
      const validSortColumns = ["title", "release_year", "rating"];
      if (validSortColumns.includes(query.sortBy)) {
        const order = query.order === "desc" ? "DESC" : "ASC";
        sql += ` ORDER BY ${query.sortBy} ${order}`;
      }
    }

    console.log("SQL Query:", sql); // Log untuk melihat query yang akan dieksekusi
    console.log("Values:", values); // Log untuk melihat nilai yang akan dipakai dalam query

    const [results] = await db.query(sql, values);
    return results;
  } catch (err) {
    console.error("Database query error:", err);
    throw err;
  }
};



module.exports = { getAllMovies };
