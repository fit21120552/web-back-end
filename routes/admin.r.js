//handle request from client
const express = require("express");
const route = express.Router();
const adminController = require("../controllers/admin.c");
const productRouter = require("./productRoute");
const categoryRouter = require("./categoryRoute");
route.get("/", adminController.Home);

route.use("/product", productRouter);
route.use("/category", categoryRouter);
module.exports = route;
