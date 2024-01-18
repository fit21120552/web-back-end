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
    discountPercentage:{
        type:String,
        required:[true]
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
