//handle request from client
const express = require("express");
const route = express.Router();
const userController = require("../controllers/user.c");
const cartRouter = require("./cartRoute");
const orderRouter = require("./orderRoute");
//update password
route.post("/passwordm/:id", userController.UpdatePassword);
//home page
route.get("/", userController.Home);
route.use("/carts", cartRouter);
route.use("/orders", orderRouter);
module.exports = route;
