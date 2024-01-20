//handle request from client 
const express = require("express");
const route = express.Router();
const userController = require('../controllers/user.c');

//update password
route.post("/passwordm/:id",userController.UpdatePassword)
//home page
route.get("/",userController.Home)
module.exports = route; 