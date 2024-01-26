const mongoose = require("mongoose");
const productModel = require("./productModel");
const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: [true, "order must belong to a user"],
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "order must belong to a product"],
    },
  ],
  price: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  StatusPaid: {
    type: Boolean,
    default: false,
  },
  StatusDelivered: {
    type: Boolean,
    default: false,
  },
  StatusCanceled: {
    type: Boolean,
    default: false,
  },
  tax: {
    type: Number,
    default: 20,
  },
  ShipCost: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    required: [true, "order must have address"],
  },
  city: {
    type: String,
  },
  phone: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  country: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
});

OrderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
  }).populate({
    path: "user",
  });
});
OrderSchema.pre("save", async function (next) {
  if (this.isModified("StatusPaid") && this.StatusPaid === true) {
    this.StatusDelivered = true;
  }
  next();
});
OrderSchema.statics.calcTotalPrice = async function (doc) {
  let totalPrice = 0;
  for (const el of doc.products) {
    const product = await productModel.findById(el);
    totalPrice += product.price;
  }
  totalPrice = totalPrice + doc.tax + doc.ShipCost;
  return totalPrice;
};

OrderSchema.post("save", async function () {
  this.price = await this.constructor.calcTotalPrice(this);
});
const order = mongoose.model("Order", OrderSchema);
module.exports = order;
