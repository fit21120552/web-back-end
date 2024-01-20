const mongoose = require("mongoose");
const Product = require("./../models/productModel");
const ReviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "tour must have review"],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: [true, "reviews must belong to have user"],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "reviews must belong to have product"],
  },
});

ReviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: 0,
      ratingsQuantity: 4.5,
    });
  }
};
ReviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.product);
});

ReviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

ReviewSchema.post(/^findOneAnd/, async function (next) {
  await this.r.constructor.calcAverageRatings(this.r.product._id);
});
const review = mongoose.model("Review", ReviewSchema);
module.exports = review;
