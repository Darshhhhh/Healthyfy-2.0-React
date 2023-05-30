const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URL;

const connection = () => {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((err) => {
      console.log("Error occured while connecting to MongoDB!", err);
    });
};

module.exports = connection;
