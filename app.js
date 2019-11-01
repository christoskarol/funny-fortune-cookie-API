const express = require("express");
const fortunes = require("./data/fortunes");

const port = 3000;

const app = express();

app.get("/fortunes", (req, res) => {
  console.log("requesting fortune cookie");
  res.send(fortunes);
});

module.exports = app;
