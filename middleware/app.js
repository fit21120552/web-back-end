const express = require("express");
const session = require("express-session");
const passport = require('passport');
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
dotenv.config({ path: "../config.env" });
const app = express();
const ErrorHandlerController = require("../controllers/ErrorController.js");
const appError = require("../utils/appError.js");

const auth = require('./auth.js');
process.noDeprecation = true;
//route
const userRouter = require('../routes/user.r.js');
const adminRouter = require('../routes/admin.r.js');
const commonRouter = require('../routes/common.r.js');
const productRouter = require("../routes/productRoute.js");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//use session 
app.use(
  session({
    secret: "secret-key-123",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));
// middleware router
app.use("/api/v1/product", productRouter);
app.use("/user",auth.authentication,auth.authorization,userRouter);
app.use(commonRouter);
app.use("/admin",auth.authentication,auth.authorization,adminRouter);
// middleware write log production and dev
// app.all("*", (req, res, next) => {
//   next(new appError(`Can not find ${req.originalUrl} on server`, 404));
// });
app.use(ErrorHandlerController);

//login with google
var GoogleStrategy = require('passport-google-oauth2').Strategy;
app.use(passport.initialize());
app.use(passport.session());
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));
passport.serializeUser((user, done) => {
  done(null, user);
})
passport.deserializeUser((user, done) => {
  done(null, user);
})

module.exports = app;
