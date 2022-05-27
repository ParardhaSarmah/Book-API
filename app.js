const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const bookRoutes = require("./routes/bookRoutes");
app.use("/", bookRoutes);
module.exports = app;
