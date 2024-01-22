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
    ref: "user",
    unique: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

CartSchema.pre("save", async function (next) {
  this.quantity = this.product.length;
});

CartSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    const updatedCart = await this.model.findOne(this.getQuery());
    updatedCart.quantity = updatedCart.product.length;
    await updatedCart.save();
  }
});
CartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: "title price brand category discountPercentage",
  });
  this.populate({
    path: "user",
    select: "username email",
  });
  next();
});

const cart = mongoose.model("Cart", CartSchema);
module.exports = cart;
