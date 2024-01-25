const mongoose = require("mongoose");
const categoryModel = require("./categoryModel");
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
    ratingsQuantity: {
      type: Number,
      default: 0,
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

ProductSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});


ProductSchema.post("findByIdAndUpdate", async function (doc) {
  const category = await categoryModel.findOne({ name: doc.category });
  if (category) {
    category.productCount = await product.countDocuments({ category: doc.category });
    await category.save();
  }
});

ProductSchema.post("findByIdAndDelete", async function (doc) {
  const category = await categoryModel.findOne({ name: doc.category });
  if (category) {
    category.productCount = await product.countDocuments({ category: doc.category });
    await category.save();
  }
});
const product = mongoose.model("Product", ProductSchema);
module.exports = product;
