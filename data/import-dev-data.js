const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const productModel = require("../models/productModel.js");
const categoryModel = require("./../models/categoryModel.js");
const orderModel = require("./../models/orderModel.js");
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect to database successfully");
  });

// Read JSON file
const product = JSON.parse(fs.readFileSync(`${__dirname}/product.json`, "utf-8"));
const category = JSON.parse(fs.readFileSync(`${__dirname}/category.json`, "utf-8"));
// Import data into database
const importData = async () => {
  try {
    await productModel.create(product, { validateBeforeSave: false });
    await categoryModel.create(category, { validateBeforeSave: false });
    console.log("data successfully loaded");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

// DELEte all data from DB
const deleteData = async () => {
  try {
    // await productModel.deleteMany({});
    // await categoryModel.deleteMany({});
    await orderModel.deleteMany({});
    console.log("data successfully deleted");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

if (process.argv[2] == "--import") {
  importData();
} else if (process.argv[2] == "--delete") {
  deleteData();
}
