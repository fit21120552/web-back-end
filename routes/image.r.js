const express = require("express");
const router = express.Router();
const imageController = require('../controllers/image.c')

router.get('/product',imageController.getProductImage)
router.get('/user/', imageController.getUserImage)
module.exports = router