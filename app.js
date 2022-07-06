const express = require("express");
const cookieParser = require("cookie-parser");

// routes
const homeRoute = require("./routes/home");
const userRoute = require("./routes/user");
const reportRoute = require("./routes/report");

app = express();

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoute);
app.use("/", userRoute);
app.use("/", reportRoute);

exports.app = app;
