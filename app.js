const express = require("express");

// routes
const homeRoute = require("./routes/home");
const userRoute = require("./routes/user");

app = express();

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoute);
// app.get("/", userRoute);

exports.app = app;
