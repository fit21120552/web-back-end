const mongoose = require("mongoose");
const factory = require("./../db/HandleFactory");
const OrderModel = require("./../models/orderModel");

exports.getAllOrder = factory.getAll(OrderModel, {
  path: "product",
});
exports.getOrder = factory.getOne(OrderModel);
exports.createOrder = factory.createOne(OrderModel);
exports.updateOrder = factory.updateOne(OrderModel);
exports.deleteOrder = factory.deleteOne(OrderModel);
