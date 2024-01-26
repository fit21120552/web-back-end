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
  subCategory: [
    {
      name: String,
    },
  ],
  image: {
    type: String,
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
    select: "title price brand",
  });
  next();
});

CategorySchema.pre("save", async function (next) {
  this.productCount = this.products.length;
  next();
});

// CategorySchema.pre("save", async function (next) {
//   const existingCategory = await Category.findOne({ name: this.name });
//   if (existingCategory) {
//     return next();
//   }
//   const products = await productModel.find({ category: this.name });
//   const uniqueBrands = [...new Set(products.map((product) => product.brand))];
//   this.subCategory = uniqueBrands.map((brand) => ({ name: brand }));
//   next();
// });
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
