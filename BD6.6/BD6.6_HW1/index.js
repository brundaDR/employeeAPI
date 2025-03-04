let cors = require("cors");
let express = require("express");

let { getAllMovies, getMovieById } = require("./controllers");

let app = express();
app.use(cors());
app.use(express.json());

app.get("/movies", async (req, res) => {
  const movies = await getAllMovies();
  res.json({ movies });
});

app.get("/movies/details/:id", async (req, res) => {
  let movie = await getMovieById(parseInt(req.params.id));
  res.json({ movie });
});

module.exports = { app };
