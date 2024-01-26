const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: [true, "order must belong to a user"],
  },
  product: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "order must belong to a product"],
    },
  ],
  price: {
    type: Number,
    required: [true, "order must have a total price"],
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

const order = mongoose.model("Order", OrderSchema);
module.exports = order;
