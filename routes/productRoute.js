const express = require("express");
const productController = require("./../controllers/productController");
const productRouter = express.Router();

productRouter.route("/").get(productController.getAllProduct).post(productController.createProduct);

productRouter
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

  
module.exports = productRouter;
