const factory = require("./../db/HandleFactory");
const categoryModel = require("./../models/categoryModel");
const productModel = require("./../models/productModel");

exports.getAllCategory = factory.getAll(categoryModel);
// exports.getAllCategory = async (req, res, next) => {
//   const listCategory = await productModel.aggregate([
//     {
//       $group: {
//         _id: "$category",
//         totalProducts: { $sum: 1 },
//         products: {
//           $push: "$$ROOT._id",
//         },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         name: "$_id",
//         productCount: "$totalProducts",
//         products: 1,
//       },
//     },
//   ]);
//   console.log(listCategory);
//   res.status(200).json({
//     status: "success",
//     data: listCategory,
//   });
// };

exports.createCategory = factory.createOne(categoryModel);

exports.getCategory = factory.getOne(categoryModel, { path: "products" });

exports.updateCategory = factory.updateOne(categoryModel);

exports.deleteCategory = factory.deleteOne(categoryModel);
