const express = require("express");
const OrderRouter = express.Router({ mergeParams: true });
const OrderController = require("./../controllers/orderController");

OrderRouter.route("/").get(OrderController.getAllOrder).post(OrderController.createOrder);
OrderRouter.route("/:id")
  .get(OrderController.getOrder)
  .patch(OrderController.updateOrder)
  .delete(OrderController.deleteOrder);

module.exports = OrderRouter;