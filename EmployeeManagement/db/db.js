const mongoose = require("mongoose");

const connection = () => {
  mongoose
    .connect("mongodb://localhost:27017/empManagement")
    .then((result) => {
      console.log("connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connection;