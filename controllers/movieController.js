const { getAllMovies } = require("../models/movieModel");

const getMoviesHandler  = async (req, res) => {
  console.log("Request received to get movies");
  try {
    const movies = await getAllMovies(req.query); // Kirim query ke model
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getMoviesHandler;

