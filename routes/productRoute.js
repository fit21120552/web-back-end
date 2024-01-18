const express = require('express');
const route = express.Router();

route.get("/product",(req,res)=>
{
    return res.json("product page");
})
module.exports=route;