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
  statsProductPrice: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
      totalPrice: {
        type: Number,
        default: 0,
      },
      quantityProduct: {
        type: Number,
        default: 0,
      },
      nameProduct: {
        type: String,
      },
      imageProduct: {
        type: String,
      },
    },
  ],
  quantity: {
    type: Number,
    default: 1,
  },
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
    path: "products",
  }).populate({
    path: "user",
  });
  next();
});
OrderSchema.pre("save", async function (next) {
  if (this.isModified("StatusPaid") && this.StatusPaid === true) {
    this.StatusDelivered = true;
  }
  next();
});
OrderSchema.statics.calcTotalPrice = async function (doc) {
  let totalPrice = 0;
  let quantityProduct = 0;
  for (const el of doc.products) {
    const product = await productModel.findById(el);
    totalPrice += product.price;
    quantityProduct++;
  }
  totalPrice = totalPrice + doc.tax + doc.ShipCost;
  return { totalPrice, quantityProduct };
};
OrderSchema.pre("save", async function (next) {
  const obj = await this.constructor.calcTotalPrice(this);
  this.price = obj.totalPrice;
  this.quantity = obj.quantityProduct;
  for (const el of this.products) {
    const product = await productModel.findById(el);
    const existingStat = this.statsProductPrice.find((stat) => stat.product.equals(el));
    if (!existingStat) {
      this.statsProductPrice.push({
        product: el,
        totalPrice: product.price,
        quantityProduct: 1,
        nameProduct: product.name,
        imageProduct: product.image,
      });
    } else {
      existingStat.totalPrice += product.price;
      existingStat.quantityProduct += 1;
    }
  }
  next();
});

OrderSchema.post("findOneAndUpdate", async function (doc) {
  if (doc.StatusDelivered === true) {
    for (const el of doc.products) {
      const product = await productModel.findById(el);
      product.stock--;
      if (product.stock <= 0) product.stock = 0;
      await product.save();
    }
  }
});
const order = mongoose.model("Order", OrderSchema);
module.exports = order;
