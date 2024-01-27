const catchAsync = require("./../utils/catchAsync");
const OrderModel = require("./../models/orderModel");
exports.getData = catchAsync(async (req, res, next) => {
  const stats = await OrderModel.aggregate([
    {
      $match: { StatusPaid: true },
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalPrice: { $sum: "$price" },
        totalProducts: { $sum: { $size: "$products" } },
      },
    },
  ]);
  console.log(stats);
  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});
