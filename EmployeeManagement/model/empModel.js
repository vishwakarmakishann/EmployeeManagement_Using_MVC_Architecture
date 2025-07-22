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

const empModel = mongoose.model("emp", empSchema);

module.exports = empModel;