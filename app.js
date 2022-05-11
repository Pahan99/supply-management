const express = require("express");
const dotenv = require("dotenv");

require("dotenv").config();

app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
});

exports.app = app;
