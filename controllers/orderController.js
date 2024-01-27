const factory = require("./../db/HandleFactory");
const OrderModel = require("./../models/orderModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
exports.setUser = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.session.idUser;
  next();
});

exports.getStatsRevenueByDayOfWeek = catchAsync(async (req, res, next) => {
  const stats = await OrderModel.aggregate([
    {
      $match: { StatusPaid: true },
    },
    {
      $group: {
        _id: { $dayOfWeek: "$createdAt" },
        numOrder: { $sum: 1 },
        totalPrice: { $sum: "$price" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const weeklyStats = [0, 0, 0, 0, 0, 0, 0];

  stats.forEach((stat) => {
    const dayOfWeek = stat._id;
    const numOrder = stat.numOrder;
    const totalPrice = stat.totalPrice;

    weeklyStats[dayOfWeek - 2] = { numOrder, totalPrice };
  });

  res.status(200).json({
    status: "success",
    data: {
      stats: weeklyStats,
    },
  });
});

exports.statsNumberProduct = catchAsync(async (req, res, next) => {
  const page = parseInt(1) || 1;
  const limit = parseInt(5) || 10;

  const skip = (page - 1) * limit;

  const stats = await OrderModel.aggregate([
    {
      $match: { StatusPaid: true },
    },
    {
      $unwind: "$products",
    },
    {
      $lookup: {
        from: "products",
        localField: "products",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $group: {
        _id: "$products",
        numOrder: { $sum: 1 },
        name: { $first: "$productDetails.title" },
        price: { $first: "$productDetails.price" },
      },
    },
    {
      $sort: { numOrder: -1 },
    },
    {
      $limit: limit,
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

exports.getStatsOrder = catchAsync(async (req, res, next) => {
  const stats = await OrderModel.aggregate([
    {
      $match: { StatusPaid: true },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
    {
      $project: {
        "userDetails.password": 0,
        "userDetails.passwordConfirm": 0,
        "userDetails.passwordChangedAt": 0,
        "userDetails.role": 0,
        "userDetails.active": 0,
        "userDetails.createdAt": 0,
        "userDetails.updatedAt": 0,
        "userDetails.__v": 0,
        StatusPaid: 0,
        StatusDelivered: 0,
        StatusCanceled: 0,
        tax: 0,
        ShipCost: 0,
        address: 0,
        city: 0,
        phone: 0,
        postalCode: 0,
        country: 0,
        paymentMethod: 0,
        products: 0,
        user: 0,
        __v: 0,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $limit: 5,
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

exports.getStatsPlaceOrder = catchAsync(async (req, res, next) => {
  const { idOrder } = req.params;
  const order = await OrderModel.findById(idOrder).populate("user").populate("products");

  if (!order) {
    return next(new AppError("no order found with that id", 404));
  }

  const statsProductPrice = order.products.map((product) => ({
    productInfo: product,
    quantity: order.quantity,
    totalPrice: product.price * order.quantity,
  }));

  const formattedOrder = {
    user: order.user,
    products: order.products,
    quantity: order.quantity,
    price: order.price,
    createdAt: order.createdAt,
    StatusPaid: order.StatusPaid,
    StatusDelivered: order.StatusDelivered,
    StatusCanceled: order.StatusCanceled,
    tax: order.tax,
    ShipCost: order.ShipCost,
    address: order.address,
    city: order.city,
    phone: order.phone,
    postalCode: order.postalCode,
    country: order.country,
    paymentMethod: order.paymentMethod,
    statsProductPrice,
  };

  res.status(200).json({
    status: "success",
    formattedOrder,
  });
});

exports.getAllOrder = factory.getAll(OrderModel);
exports.getOrder = factory.getOne(OrderModel);
exports.createOrder = factory.createOne(OrderModel);
exports.updateOrder = factory.updateOne(OrderModel);
exports.deleteOrder = factory.deleteOne(OrderModel);
