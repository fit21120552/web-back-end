const userModel = require("../models/user.m");
module.exports =
{
    //handle sign up
    Home: async (req, res) => {
        try {
            const data = await userModel.GetAllUser();
            return res.json(data);
        }
        catch (error) {
            next(error);
        }
    },
}
