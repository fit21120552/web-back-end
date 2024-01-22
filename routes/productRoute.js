const express = require("express");
const productController = require("./../controllers/productController");
const productRouter = express.Router({ mergeParams: true });
const reviewRouter = require("./reviewRoute");
productRouter.route("/").get(productController.getAllProduct);
productRouter.route("/:id").get(productController.getProduct);

// permission admin
productRouter.route("/create").post(productController.createProduct);
productRouter.route("/update/:id").patch(productController.updateProduct);
productRouter.route("/delete/:id").delete(productController.deleteProduct);

productRouter.use("/:productId/reviews/", reviewRouter);
module.exports = productRouter;
