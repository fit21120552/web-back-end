//handle request from client 
const express = require("express");
const route = express.Router();
const userController = require('../controllers/user.c');

//sign up
route.post("/signup",userController.SignUp)
//sign in
route.post("/signin",userController.SignIn)
module.exports = route; 