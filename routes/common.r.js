//handle request from client 
const express = require("express");
const route = express.Router();
const userController = require('../controllers/user.c');
//sign up
route.post("/signup",userController.SignUp)
//sign in
route.post("/signin",userController.SignIn)
//get page sign in
route.get("/signin",userController.GetSignIn)
//get page sign in
route.get("/",userController.GetSignIn)
//get page sign up
route.get("/signup",userController.GetSignUp)
module.exports = route; 