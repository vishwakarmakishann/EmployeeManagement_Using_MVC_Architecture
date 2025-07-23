const mongoose = require("mongoose");

const empSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  salary: {
    type: Number,
    require: true,
  },
  department: {
    type: String,
    require: true,
  },
});

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const empModel = mongoose.model("emp", empSchema);

const userModel = mongoose.model("user", userSchema);

module.exports = { empModel, userModel };
