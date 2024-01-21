const Cart = require("./../models/cartModels");
const Product = require("./../models/productModel");
const factory = require("./../db/HandleFactory");
const appError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.checkUserIsLogin = catchAsync(async (req, res, next) => {
  if (req.user._id) {
    req.body.user = req.user._id;
  }
  next();
});
exports.setUserIsLogin = catchAsync(async (req, res, next) => {
  if (req.user._id) {
    await findByIdAndUpdate(req.user._id, { user: req.user._id });
  }
  next();
});
exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.find({ user: req.user._id });
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.getCartById = factory.getOne(Cart);
exports.createCart = factory.createOne(Cart);
exports.updateCart = factory.updateOne(Cart);
exports.deleteCart = factory.deleteOne(Cart);
