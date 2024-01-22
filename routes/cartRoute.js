const express = require("express");
const CartRouter = express.Router({ mergeParams: true });
const CartController = require("./../controllers/cartController");
const auth = require("./../middleware/auth");
CartRouter.route("/").get(CartController.getCart).post(CartController.createCart);
CartRouter.route("/:id")
  .get(CartController.getCartById)
  .patch(CartController.updateCart)
  .delete(CartController.deleteCart);
module.exports = CartRouter;
