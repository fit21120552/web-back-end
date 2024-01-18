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
      required: [true],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, "rating must be above 1"],
      max: [5, "rating must be below 5"],
      set: (val) => Math.round(val * 10) / 10,
    },
    images: [String],
    thumbnail: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "product must have category"],
    },
    brand: {
      type: String,
      required: [true, "product must have brand"],
    },
    stock: {
      type: Number,
      required: [true, "product must have stock"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const product = mongoose.model("Product", ProductSchema);
module.exports = product;