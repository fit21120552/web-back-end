const express = require("express");
const CartRouter = express.Router({ mergeParams: true });
const CartController = require("./../controllers/cartController");
const auth = require("./../middleware/auth");
CartRouter.route("/").get(CartController.getCart);
CartRouter.route("/create").post(CartController.SaveInfoUser, CartController.createCart);
CartRouter.route("/update").patch(CartController.setIDparams, CartController.updateCart);
CartRouter.route("/delete").delete(CartController.setIDparams, CartController.deleteCart);
module.exports = CartRouter;
