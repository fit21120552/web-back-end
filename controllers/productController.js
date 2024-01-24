const mongoose = require("mongoose");
const products = require("./../models/productModel");
const factory = require("./../db/HandleFactory");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllProduct = factory.getAll(products, { path: "reviews" });

exports.createProduct = factory.createOne(products);

exports.getProduct = factory.getOne(products, { path: "reviews" });

exports.updateProduct = factory.updateOne(products);

exports.deleteProduct = factory.deleteOne(products);

exports.getRelatedProducts = catchAsync(async (req, res, next) => {
  const currentProduct = await products.findById(req.params.productId);
  if (!currentProduct) {
    return next(new AppError("no product found", 404));
  }
  const relatedProducts = await products
    .find({
      $and: [
        { brand: currentProduct.brand },
        { category: currentProduct.category },
        { price: { $gte: currentProduct.price - 500, $lte: currentProduct.price + 500 } },
        { _id: { $ne: currentProduct._id } },
      ],
    })
    .limit(4);
  res.status(200).json({
    status: "success",
    result: relatedProducts.length,
    data: {
      data: relatedProducts,
    },
  });
});
