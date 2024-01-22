const CartModel = require("./../models/cartModels");
const factory = require("./../db/HandleFactory");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../configs/db_connection");
const mongoose = require("mongoose");

exports.setIDparams = catchAsync(async (req, res, next) => {
  const cart = await CartModel.findOne({ user: req.session.idUser });
  req.params.id = cart._id;
  next();
});
exports.getCart = catchAsync(async (req, res, next) => {
  const idUser = req.session.idUser;
  const cart = await CartModel.find({ user: idUser });
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});
exports.SaveInfoUser = catchAsync(async (req, res, next) => {
  const idUser = req.session.idUser;
  req.body.user = idUser;
  next();
});
exports.getCartById = factory.getOne(CartModel);
exports.createCart = factory.createOne(CartModel);
exports.updateCart = factory.updateOne(CartModel);
exports.deleteCart = factory.deleteOne(CartModel);
