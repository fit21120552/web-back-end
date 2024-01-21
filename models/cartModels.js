const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  product: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  quantity: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now(),
    unique: true,
  },
});

CartSchema.pre("save", async function (next) {
  this.quantity = this.product.length;
});

CartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: "title price brand category discountPercentage",
  }).populate({
    path: "user",
    select: "username email",
  });
});
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
