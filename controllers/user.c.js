const userModel = require("../models/user.m");
const bcrypt = require("bcryptjs");
const axios = require('axios');
const { verify } = require("crypto");
const nodemailer = require("nodemailer");
const { isEmail } = require("validator");
const saltRounds = 10;
const FileUtility = require("../utils/FileUtility")
//collections sessions
const sessionModel = require('../models/session.m');
module.exports = {
  //Home
  Home: async (req, res, next) => {
    try {
      //return all user
      return res.json("home page user");
    } catch (error) {
      next(error);
    }
  },
  //handle sign up
  SignUp: async (req, res, next) => {
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
  SignIn: async (req, res, next) => {
    try {

      const { username = "", password = "", email = "" } = req.body;
      //login with google
      const userM= await userModel.GetUserByMail(email);
      if (userM != undefined) {
        let sess = req.session;
        sess.idUser = userM._id;
        sess.isAuthenticated = true;
        sess.username = userM.username;
        sess.role = userM.role;
        req.session.cookie.maxAge =10*60* 60 * 1000;
        let sessionId = req.sessionID;
        return res.json({ userM, sessionId });
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
      req.session.cookie.maxAge = 10*60*60* 1000;
      const sessionId = req.sessionID;
      return res.json({ user, sessionId });
    } catch (error) {
      next(error);
    }
  },
  //get page sign in
  GetSignIn: async (req, res, next) => {
    try {
      return res.json("Sign in page");
    } catch (error) {
      next(error);
    }
  },
  //get page sign up
  GetSignUp: async (req, res, next) => {
    try {
      return res.json("Sign up page");
    } catch (error) {
      next(error);
    }
  },
  //update password
  UpdatePassword: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { password } = req.body;
      console.log(password)
      const hash = bcrypt.hashSync(password, saltRounds);
      await userModel.UpdateOneField(id, "password", hash);
      return res.json("success");
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
      const result = await userModel.register(username, "$2a$10$xCCD108Zwg8MKO3HqDPWTOhqw8pSq0s5VL/pK5jYNtg1WlThY4rve", email, "user");
      const returnData = await userModel.GetUserByMail(email);
      return res.redirect(`http://localhost:3001/login?email=${email}`)
    }
    return res.redirect(`http://localhost:3001/login?email=${email}`)
  },
  //reset password
  GetCodeEmail: async (req, res, next) => {
    try {
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
      req.header = "check";
      var verifycode = Math.floor(100000 + Math.random() * 900000);
      req.session.verifycode = verifycode;
      req.session.cookie.maxAge =5 * 60 * 1000;
      const sessionId = req.sessionID;
      var mailOptions = {
        from: "pass40697@gmail.com",
        to: email,
        subject: "Verify code to reset password for your account",
        text: `Your verify code is  ${verifycode}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).json({ error: 'Something not correct please try again !' });
        } else {
          res.status(200).json({ msg: "We send code with 6 numbers to email please check !", sessionId });
        }
      });
    } catch (error) {
      next(error)
    }
  },
  //Check code
  CheckCode: async (req, res, next) => {
    try {
      const { verifyCode, username, password, sessionId } = req.body;
      const data = await sessionModel.GetOneSession(sessionId);
      const parsedSession = JSON.parse(data.session);
      req.session.verifycode = parsedSession.verifycode;
      req.session.cookie.maxAge = 5 * 60 * 1000;
      if (req.session.verifycode == verifyCode) {
        const user = await userModel.GetUser(username);
        const id = user._id;
        const hash = bcrypt.hashSync(password, saltRounds);
        await userModel.UpdateOneField(id, "password", hash);
        req.session.destroy();
        return res.json("success");
      }
      return res.json("Your code is not correct !");
    }
    catch (error) {
      next(error)
    }
  },

  UpdateAvatar:  async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log('id: ',id)
      console.log("file: ", req.file)
    
      if (req.file.fieldname==="avatar") { //image of user
        let destinationPath = `uploads/users/${id}/`
        await FileUtility.createFolderIfNotExists(destinationPath) //create folder for user's image
        // move image to new folder
        await FileUtility.moveImageFile(req.file.path, destinationPath + req.file.filename,(err) => {
          if (err) {
              console.error(err);
              console.log('Failed to move the image file')
             
          }}) 
      }

      await userModel.UpdateOneField(id, "avatar", req.file.filename);
      const user = await userModel.DetailUser(id)
      return res.json(user);
    } catch (error) {
      next(error);
    }
  },

};
