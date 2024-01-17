const userModel = require('../models/user.m');
const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports =
{
    SignUp: async (req, res) => {
        const { username, password, email, role = "user" } = req.body;
        //check exists username
        //hash password
        const hash = bcrypt.hashSync(password, saltRounds);
        const user = await userModel.GetUser(username);
        if (user != undefined) {
            if (user.username == username) {
                return res.json("Exists username");
            }
            else {
                const result = await userModel.register(username, hash, email, role);
                if (result != null) { return res.json("success"); }
            }
        }
        else {
            const result = await userModel.register(username, hash, email, role);
            if (result != null) { return res.json("success"); }
        }


    },
    SignIn: async (req, res) => {
        const { username, password } = req.body;
        //check username ( get user by user name)
        const user = await userModel.GetUser(username);
        if (user == undefined) {
            return res.json("Username isn't correct !");
        }
        //check password
        var check = bcrypt.compareSync(password, user.password);
        if (!check) {
            return res.json("Password isn't correct! ");
        }
        //check role
        if (user.role == "user") {
            return res.json("user page");
        }
        else {
            return res.json("admin page")
        }
    }
}