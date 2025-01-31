const express = require("express");
const router = express.Router();
const  getMoviesHandler  = require("../controllers/movieController");

console.log("Movie Routes Loaded");

// Rute GET untuk mengambil semua film dengan filter, sort, dan search
router.get("/", getMoviesHandler);

module.exports = router;
