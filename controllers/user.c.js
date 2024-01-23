const userModel = require("../models/user.m");
const bcrypt = require("bcryptjs");
const { verify } = require("crypto");
const nodemailer = require("nodemailer");
const { isEmail } = require("validator");
const saltRounds = 10;

module.exports = {
  //Home
  Home: async (req, res) => {
    try {
      return res.json("home page user");
    } catch (error) {
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
      const userM = await userModel.GetUserByMail(email);
      if (user != undefined) {
        return res.json("Exists username!");
      }
      if (userM != undefined) {
        return res.json("Exists email!");
      }
      const result = await userModel.register(username, hash, email, role);
      if (result != null) {
        return res.json("success");
      }

    } catch (error) {
      next(error);
    }
  },
  //handle sign in
  SignIn: async (req, res) => {
    try {
      const { username="", password="",email="" } = req.body;
      //login with google
      const userM = await userModel.GetUserByMail(email);
      if(userM!=undefined)
      {
        let sess = req.session;
        sess.idUser = userM._id;
        sess.isAuthenticated = true;
        sess.username = userM.username;
        sess.role = userM.role;
        return res.json(userM);
      }
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
      sess.idUser = user._id;
      sess.isAuthenticated = true;
      sess.username = username;
      sess.role = user.role;
      return res.json(user);
    } catch (error) {
      next(error);
    }
  },
  //get page sign in
  GetSignIn: async (req, res) => {
    try {
      return res.json("Sign in page");
    } catch (error) {
      next(error);
    }
  },
  //get page sign up
  GetSignUp: async (req, res) => {
    try {
      return res.json("Sign up page");
    } catch (error) {
      next(error);
    }
  },
  //update password
  UpdatePassword: async (req, res) => {
    try {
      const id = req.params.id;
      const { password } = req.body;
      const hash = bcrypt.hashSync(password, saltRounds);
      await userModel.UpdateOneField(id, "password", hash);
      return res.json("Update successfully!");
    } catch (error) {
      next(error);
    }
  },
  //login with google
  Success: async (req, res) => {
    const user = req.session.passport.user;
    const email = user.email;
    const username = user.displayName;
    const data = await userModel.GetUserByMail(email);
    let sess = req.session;
    sess.isAuthenticated = true;
    sess.username = username;
    sess.role = "user";
    if (data == undefined) {
      const result = await userModel.register(username, "null", email, "user");
      const returnData =  await userModel.GetUserByMail(email);
      return res.redirect(`http://localhost:3001/login?email=${email}`)
    }
    return res.redirect(`http://localhost:3001/login?email=${email}`)
  },
  //reset password
  GetCodeEmail: async (req, res) => {
    const { username, email } = req.body;
    const User = await userModel.GetUser(username);
    if (User == undefined) {
      return res.json("User not exits !");
    }
    if (User.email != email) {
      return res.json("The email register is not correct !");
    }
    //send code to email
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pass40697@gmail.com",
        pass: "lvsjcyqdojmyxazv",
      },
    });

    var verifycode = Math.floor(100000 + Math.random() * 900000);
    req.session.verifycode = verifycode;
    req.session.cookie.makeAge = 3 * 60 * 1000;
    var mailOptions = {
      from: "pass40697@gmail.com",
      to: email,
      subject: "Verify code to reset password for your account",
      text: `Your verify code is  ${verifycode}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.json("We send code with 5 numbers to email please check !");
      }
    });
  },
  //Check code
  CheckCode: async (req, res) => {
    const { verifyCode,username,password } = req.body;

    if (req.session.verifycode == verifyCode) {
      const user = await userModel.GetUser(username);
      const id = user._id;
      const hash = bcrypt.hashSync(password, saltRounds);
      await userModel.UpdateOneField(id, "password", hash);
      return res.json("Password change!");
    }
    return res.json("Your code is not correct");
  },
};
