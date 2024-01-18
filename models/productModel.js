const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "product must have title"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "product must have description"],
    },
    price: {
      type: Number,
      required: [true, "product must have to price"],
    },
    discountPercentage: {
      type: String,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "rating must be above 1.0"],
      max: [5, "rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    stock: {
      type: Number,
      required: [true, "product must have stock"],
    },
    brand: {
      type: String,
      required: [true, "product must have brand"],
    },
    category: {
      type: String,
      required: [true, "product must have category"],
    },
    thumbnail: {
      type: String,
    },
    images: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const product = mongoose.model("Product", ProductSchema);
module.exports = product;
