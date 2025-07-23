const {
  getEmp,
  addEmpForm,
  addEmp,
  updateForm,
  updateEmp,
  deleteEmp,
  searchEmp,
  signup,
  signupForm,
  login,
  loginForm,
  logout
} = require("../controller/empController");
const express = require("express");
const router = express.Router();

router.get("/", getEmp);
router.post("/addEmp", addEmp);
router.post("/update/:id", updateEmp);
router.get("/addEmpForm", addEmpForm);
router.get("/updateForm/:id", updateForm);
router.get("/delete/:id", deleteEmp);
router.post("/searchEmp",searchEmp);
router.get("/signup", signupForm)
router.post("/signup", signup);
router.get("/login", loginForm);
router.post("/login",login);
router.get("/logout",logout)

module.exports = router;
