const cors = require("cors");
const express = require("express");

let {getAllEmployees, getEmployeeById} = require("./controllers");

let app = express();

app.use(cors());
app.use(express.json());

app.get("/employees", async (req, res) => {
  const employees = await getAllEmployees();
  res.json({ employees });
});

app.get("/employees/details/:id", async (req, res) => {
  let employee = await getEmployeeById(parseInt(req.params.id));
  res.json({ employee });
});

module.exports = { app };
