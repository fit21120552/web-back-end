const mongoose = require("mongoose");
const products = require("./../models/productModel");
const factory = require("./../db/HandleFactory");
const catchAsync = require("./../utils/catchAsync");

exports.getAllProduct = factory.getAll(products);

exports.createProduct = factory.createOne(products);

exports.getProduct = factory.getOne(products);

exports.updateProduct = factory.updateOne(products);

exports.deleteProduct = factory.deleteOne(products);
