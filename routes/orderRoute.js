const express = require("express");
const OrderRouter = express.Router({ mergeParams: true });
const OrderController = require("./../controllers/orderController");
const auth = require("./../middleware/auth");

OrderRouter.route("/getStatsRevenueByDayOfWeek").get(OrderController.getStatsRevenueByDayOfWeek);
OrderRouter.route("/statsNumberProduct").get(OrderController.statsNumberProduct);
OrderRouter.route("/getStatsOrderLaster").get(OrderController.getStatsOrder);
OrderRouter.route("/placeOrder/:idOrder").get(OrderController.getStatsPlaceOrder);
OrderRouter.route("/getAll").get(OrderController.getAllOrder);
OrderRouter.route("/create").post(OrderController.setUser, OrderController.createOrder);
OrderRouter.route("/getOne/:id").get(OrderController.getOrder);
OrderRouter.route("/update/:id").patch(OrderController.updateOrder);
OrderRouter.route("/delete/:id").delete(OrderController.deleteOrder);

// permission user
OrderRouter.route("/getOrder").get(OrderController.setUser, OrderController.getAllOrder);
module.exports = OrderRouter;
