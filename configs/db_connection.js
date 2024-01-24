const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const validator = require("validator");

//create schema for user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    //minlength: 8,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true, 
    validate: [validator.isEmail, "Invalid Email"],
  },
  role: {
    type: String,
    required: true,
  },
});
const collection = new mongoose.model("user", userSchema);
module.exports = collection;
