const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
dotenv.config({ path: "../config.env" });
const app = express();
const ErrorHandlerController = require("../controllers/ErrorController.js");
const appError = require("../utils/appError.js");
process.noDeprecation = true;

// router
const productRouter = require("../routes/productRoute.js");

// middleware write log production and dev
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));
// middleware router
// app.use("/api/v1/product", productRouter);
// app.all("*", (req, res, next) => {
//   next(new appError(`Can not find ${req.originalUrl} on server`, 404));
// });

app.use(ErrorHandlerController);
module.exports = app;
