const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.MONGO_URI;
const CONNECT_DB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Database connection established!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = CONNECT_DB;
