const express = require("express");

// routes
const homeRoute = require("./routes/home");

app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", homeRoute);

exports.app = app;
