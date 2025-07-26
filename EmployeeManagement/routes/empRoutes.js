const express = require("express");
const { addEmpForm, addEmp, updateEmpForm, updateEmp, deleteEmp, search } = require("../controller/empController");

const empRouter = express.Router();

empRouter.get("/addEmp", addEmpForm);
empRouter.post("/addEmp", addEmp);
empRouter.get("/update/:id", updateEmpForm);
empRouter.patch("/update/:id", updateEmp);
empRouter.delete("/delete/:id", deleteEmp)
empRouter.post("/search", search);

module.exports = empRouter;
