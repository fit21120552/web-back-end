const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
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

//create schema
const userSchema = new mongoose.Schema(
    {
        username: 
        {
            type: String,
            required: true,
        },
        password: 
        {
            type: String,
            required: true,
        },
        email:
        {
            type: String,
            required: true,
        },
        role:
        {
            type: String,
            required: true,
        }
    }
)
//collection part
const collection = new mongoose.model("user",userSchema);
module.exports = collection;