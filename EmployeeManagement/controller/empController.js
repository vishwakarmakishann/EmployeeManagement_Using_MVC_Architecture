const empModel = require("../model/empModel");

const addEmpForm = (req, resp) => {
  try {
    if (!req.session.username) {
      resp.redirect("/login");
    } else {
      resp.render("addEmp", {
        Error: req.query.error,
        success: req.query.success,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const addEmp = async (req, resp) => {
  try {
    const { id, name, age, salary, department } = req.body;
    const emp = await empModel.findOne({ id });
    if (emp) {
      resp.redirect("/addEmp?error=1");
    }
    await empModel.create({ id, name, age, salary, department });
    resp.redirect("/addEmp?success=1");
  } catch (error) {
    console.log(error);
  }
};

const updateEmpForm = async (req, resp) => {
  try {
    if (!req.session.username) {
      resp.redirect("/login");
    } else {
      const emp = await empModel.findById(req.params.id);
      resp.render("updateEmp", { emp: emp, success: req.query.success });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateEmp = async (req, resp) => {
  try {
    const { id, name, age, salary, department } = req.body;
    const emp = await empModel.findByIdAndUpdate(req.params.id, {
      id,
      name,
      age,
      salary,
      department,
    });
    resp.redirect(`/update/${req.params.id}?success=1`);
  } catch (error) {
    console.log(error);
  }
};

const deleteEmp = async (req, resp) => {
  try {
    if (!req.session.username) {
      resp.redirect("/login");
    } else {
      await empModel.findByIdAndDelete(req.params.id);
      resp.redirect("/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
};

const search = async (req, resp) => {
  try {
    const keyword = req.body.search;
    const emp = await empModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { department: { $regex: keyword, $options: "i" } },
      ],
    });
    if (emp) {
      resp.render("search", { emp: emp });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addEmpForm,
  addEmp,
  updateEmpForm,
  updateEmp,
  deleteEmp,
  search,
};
