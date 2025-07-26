const mongoose = require("mongoose");

const empSchema = mongoose.Schema({
  id:{
    type: Number,
    require: true,
    unique:true
  },
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

const empModel = mongoose.model("emps", empSchema);
module.exports = empModel;
