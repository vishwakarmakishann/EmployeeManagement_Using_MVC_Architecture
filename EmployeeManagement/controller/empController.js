const empModel = require("../model/empModel");

const getEmp = async (req, resp) => {
  try {
    const emp = await empModel.find();
    resp.render("index", { emp: emp });
  } catch (error) {
    console.log(error);
  }
};

const addEmpForm = async (req, resp) => {
  try {
    resp.render("addEmpForm");
  } catch (error) {
    console.log(error);
  }
};

const addEmp = async (req, resp) => {
  try {
    const data = new empModel({
      name: req.body.name,
      age: req.body.age,
      salary: req.body.salary,
      department: req.body.department,
    });
    await data.save();
    resp.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const updateForm = async (req, resp) => {
  try {
    const emp = await empModel.findOne({ _id: req.params.id });
    resp.render("updateEmpForm", { emp: emp });
  } catch (error) {
    console.log(error);
  }
};

const updateEmp = async (req, resp) => {
  try {
    await empModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          age: req.body.age,
          salary: req.body.salary,
          department: req.body.department,
        },
      }
    );
    resp.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const deleteEmp = async (req, resp) => {
  try {
    await empModel.deleteOne({ _id: req.params.id });
    resp.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const searchEmp = async (req, resp) => {
  try {
    const emp = await empModel.find({ name: req.body.name });
    resp.render("searchedEmp", { emp: emp });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getEmp,
  addEmpForm,
  addEmp,
  updateForm,
  updateEmp,
  deleteEmp,
  searchEmp,
};
