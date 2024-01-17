const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
process.noDeprecation = true;

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({extended: false}));
app.use(express.static(`${__dirname}/public`));

module.exports = app;
