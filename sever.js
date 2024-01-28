const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const fs = require("fs");
const https = require("https");
const app = require("./middleware/app.js");

const port = process.env.port || 3000;

app.use((err, req, res, next) => {
  const statusCode = err.statusCode | 500;
  res.status(statusCode).json(err.message);
});

const options = {
  key: fs.readFileSync(__dirname + "\\certificates/key.pem"),
  cert: fs.readFileSync(__dirname + "\\certificates/cert.pem"),
};
const httpsServer = https.createServer(options, app);

// Connect to database
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect to database successfully");
  });
// // Start sever
// const server = app.listen(port, () => {
//   console.log(`app running on port = ${port}`);
// });

httpsServer.listen(port, () => {
  console.log(`sever run on port: https://localhost:${port} `);
});
