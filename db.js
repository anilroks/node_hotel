const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();

//Define MongoDb connection url
const mongoURL = process.env.MONGO_URL;

//Setup mongoDB connection
mongoose.connect(mongoURL);

//get default connection
const db = mongoose.connection;

//define event listeners for databse connection
db.on("connected", () => {
  console.log(`Connected to MongoDB server`.bgMagenta.white);
});

db.on("error", (err) => {
  console.error(`MongoDB connection error ${err}`.bgRed.white);
});

db.on("disconnected", () => {
  console.log(`MongoDB disconnection`.bgYellow.white);
});

//export database connection
module.exports = db;
