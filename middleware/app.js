const express = require("express");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
dotenv.config({ path: "./../config.env" });
const app = express();
var cors = require("cors");
//use mongo store to save session
const MongoStore = require("connect-mongo");

const ErrorHandlerController = require("./../controllers/ErrorController.js");
const appError = require("./../utils/appError.js");
const auth = require("./auth.js");
process.noDeprecation = true;
//route
const userRouter = require("../routes/user.r.js");
const adminRouter = require("../routes/admin.r.js");
const commonRouter = require("../routes/common.r.js");
const productRouter = require("../routes/productRoute.js");
const categoryRouter = require("./../routes/categoryRoute.js");
const reviewRouter = require("./../routes/reviewRoute.js");
const orderRouter = require("./../routes/orderRoute.js");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//use session

app.use(
  session({
    secret: "secret-key-123",
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://thuan:vsEsXKsLsoKlpegT@cluster0.j4s8j5c.mongodb.net/QLBANHANG?retryWrites=true&w=majority",
        ttl: 10 * 60
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 10 * 60 * 60 * 1000 },
    credentials: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

// middleware router
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/user", auth.authentication, auth.authorization, userRouter);
app.use(commonRouter);
app.use("/admin", auth.authentication, auth.authorization, adminRouter);
// app.all("*", (req, res, next) => {
//   next(new appError(`Can not find ${req.originalUrl} on server`, 404));
// });

app.use(ErrorHandlerController);

//login with google
var GoogleStrategy = require("passport-google-oauth2").Strategy;
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = app;
