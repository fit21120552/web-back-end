const dotenv = require('dotenv');
const session = require("express-session");
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = require('./app.js');
const port = process.env.port || 3000;
const userRouter = require('./routes/user.r.js');
const productRouter = require('./routes/productRoute.js');
const adminRouter = require('./routes/admin.r.js');
const commonRouter = require('./routes/common.r.js');
const auth = require('./middleware/auth.js');
app.use(
  session({
    secret: "secret-key-123",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
app.use("/user",auth.authentication,auth.authorization,userRouter);
app.use(productRouter);
app.use(commonRouter);
app.use("/admin",auth.authentication,auth.authorization,adminRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode | 500;
  res.status(statusCode).send(err.message);
});

// Connect to database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connect to database successfully');
  });
  



// Start sever
const server = app.listen(port, () => {
  console.log(`app running on port = ${port}`);
});

