const passport = require('passport');
const express = require("express");
const route = express.Router();
const userController = require('../controllers/user.c');
//sign up
route.post("/signup", userController.SignUp)
//sign in
route.post("/signin", userController.SignIn)
//get page sign in
route.get("/signin", userController.GetSignIn)
//get page sign in
route.get("/", userController.GetSignIn)
//get page sign up
route.get("/signup", userController.GetSignUp)
//login with google account
route.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email','profile']
    }
    ));
route.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/success',
        failureRedirect: '/auth/google/failure'
    }));

route.get('/success',userController.Success)
route.get('/auth/google/failure',userController.GetSignIn )
module.exports = route; 