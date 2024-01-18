const userModel = require('../models/user.m');
const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports =
{
    //Home
    Home: async (req, res) => {
        try {
            return res.json("home page user");
        }
        catch (error) {
            next(error);
        }
    },
    //handle sign up
    SignUp: async (req, res) => {
        try {
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
        }
        catch (error) {
            next(error);
        }

    },
    //handle sign in
    SignIn: async (req, res) => {
        try {
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
            let sess = req.session;
            sess.isAuthenticated = true;
            sess.username = username;
            sess.role = user.role;
            if (user.role == "user") {
                return res.redirect("/user");
            }
            else {
                return res.redirect("/admin");
            }
        }
        catch (error) {
            next(error);
        }
    },
    //get page sign in
    GetSignIn: async (req, res) => {
        try {
            return res.json("Sign in page")

        } catch (error) {
            next(error);
        }
    },
    //get page sign up
    GetSignUp: async (req, res) => {
        try {
            return res.json("Sign up page")
        } catch (error) {
            next(error);
        }
    },
    //update password
    UpdatePassword: async (req, res) => {
        try {
           const username= req.params.username
            const {password}=req.body
            const hash = bcrypt.hashSync(password, saltRounds);
            await userModel.UpdateOneField(username,"password",hash);
            return res.json("Update successfully!");
        } catch (error) {
            next(error);
        }
    },
}