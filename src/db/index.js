const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL;

const connectToDB = async () => {
  await mongoose.connect(dbUrl);

  console.log("DB connected");
};

module.exports = { connectToDB };
