const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const fortunes = require("./data/fortunes");

const app = express();

//middleware
app.use(bodyParser.json());

app.get("/fortunes", (req, res) => {
  console.log("requesting fortune cookie");
  res.json(fortunes);
});

//get a random cookie
app.get("/fortunes/random", (req, res) => {
  const random_index = Math.floor(Math.random() * fortunes.length);

  const rand_fortune = fortunes[random_index];

  res.json(rand_fortune);
});

app.get("/fortunes/:id", (req, res) => {
  res.json(fortunes.find(f => f.id == req.params.id));
});

app.post("/fortunes", (req, res) => {
  const { message, lucky_number, spirit_animal } = req.body;

  const fortune_ids = fortunes.map(f => f.id);

  const fortune = {
    id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1,
    message,
    lucky_number,
    spirit_animal
  };

  const new_fortunes = fortunes.concat(fortune);

  fs.writeFile("./data/fortunes.json", JSON.stringify(new_fortunes), err =>
    console.log(err)
  );

  res.json(new_fortunes);
});

app.put("/fortunes/:id", (req, res) => {
  const { id } = req.params;

  const old_fortune = fortunes.find(f => f.id == id);

  ["message", "lucky_number", "spirit_animal"].forEach(key => {
    if (req.body[key]) old_fortune[key] = req.body[key];
  });

  fs.writeFile("./data/fortunes.json", JSON.stringify(fortunes), err =>
    console.log(err)
  );

  res.json(fortunes);
});

app.delete("/fortunes/:id", (req, res) => {
  const { id } = req.params;
  const new_fortunes = fortunes.filter(f => f.id != id);

  fs.writeFile("./data/fortunes.json", JSON.stringify(new_fortunes), err =>
    console.log(err)
  );

  res.json(new_fortunes);
});

module.exports = app;
