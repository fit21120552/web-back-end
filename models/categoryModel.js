const mongoose = require("mongoose");
const productModel = require("./../models/productModel");
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category must have name"],
    unique: true,
  },
  productCount: {
    type: Number,
    default: 0,
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
});

CategorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "products",
    select: "title price",
  });
  next();
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
