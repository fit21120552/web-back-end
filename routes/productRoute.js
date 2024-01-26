const express = require("express");
const productController = require("./../controllers/productController");
const productRouter = express.Router({ mergeParams: true });
const reviewRouter = require("./reviewRoute");
const   { upload }   = require('../utils/Multer')
productRouter.route("/").get(productController.getAllProduct);
productRouter.route("/:id").get(productController.getProduct);

// stats
productRouter.route('/stats')
productRouter.route("/related-products/:productId").get(productController.getRelatedProducts);
// permission admin
//productRouter.route("/create").post(productController.createProduct);
productRouter.post('/create', upload.single('thumbnail'), productController.createProduct)
productRouter.post('/update-image/:id',upload.single('thumbnail'))
//productRouter.route("/update/:id").patch(productController.updateProduct);
productRouter.patch('/update/:id', upload.single('thumbnail'), productController.updateProduct)
productRouter.route("/delete/:id").delete(productController.deleteProduct);

productRouter.use("/:productId/reviews/", reviewRouter);
module.exports = productRouter;
