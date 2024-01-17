const userModel = require('../models/user.m');


module.exports =
{
    SignUp : async (req,res)=>
    {
        const {username,password}=req.body;
        await userModel.register(username,password);
        res.json("success");
    }
}