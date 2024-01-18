//handle request from client 
const express = require("express");
const route = express.Router();
const adminController = require('../controllers/admin.c');

route.get("/",adminController.Home);
module.exports = route; 