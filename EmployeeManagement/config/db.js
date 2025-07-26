const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/empdb")
    .then((result) => {
      console.log("Connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;