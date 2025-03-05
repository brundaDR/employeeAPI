let cors = require("cors");

let express = require("express");

let app = express();

app.use(cors());

app.use(express.json());

let { getAllGames, getGameById } = require("./controllers");

app.get("/games", async (req, res) => {
  let games = await getAllGames();
  res.json({ games });
});

app.get("/games/details/:id", async (req, res) => {
  let game = await getGameById(parseInt(req.params.id));
  res.json({ game });
});

module.exports = {
  app,
};
