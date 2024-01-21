const express = require("express");
const CartRouter = express.Router();
const CartController = require("./../controllers/cartController");

CartRouter.route("/")
  .get(CartController.checkUserIsLogin, CartController.getCart)
  .post(CartController.setUserIsLogin, CartController.createCart);
CartRouter.route("/:id")
  .get(CartController.getCartById)
  .patch(CartController.updateCart)
  .delete(CartController.deleteCart);
module.exports = CartRouter;
