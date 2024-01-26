const factory = require("./../db/HandleFactory");
const OrderModel = require("./../models/orderModel");
const catchAsync = require("./../utils/catchAsync");
exports.setUser = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.session.idUser;
  next();
});
exports.getAllOrder = factory.getAll(OrderModel);
exports.getOrder = factory.getOne(OrderModel);
exports.createOrder = factory.createOne(OrderModel);
exports.updateOrder = factory.updateOne(OrderModel);
exports.deleteOrder = factory.deleteOne(OrderModel);
