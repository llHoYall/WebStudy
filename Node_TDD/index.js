const express = require("express");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const user = require("./api/user");

const app = express();

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/users", user);

module.exports = app;
