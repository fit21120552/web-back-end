const mongoose = require("mongoose ");

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
    required: [true, "reviews must belong to have tour"],
  },
});

const review = mongoose.model("Review", ReviewSchema);
module.exports = review;
