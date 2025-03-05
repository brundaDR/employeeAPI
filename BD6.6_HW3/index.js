let cors = require("cors");

let express = require("express");

let app = express();

app.use(cors());

app.use(express.json());

let { getAllBooks, getBookById } = require("./controllers");

app.get("/books", async (req, res) => {
  let books = await getAllBooks();
  res.json({ books });
});

app.get("/books/details/:id", async (req, res) => {
  let book = await getBookById(parseInt(req.params.id));
  res.json({ book });
});

module.exports = {
  app,
};
