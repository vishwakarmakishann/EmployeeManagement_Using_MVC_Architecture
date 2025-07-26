const empModel = require("../model/empModel");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");

const signupForm = (req, resp) => {
  resp.render("signup", {Error:req.query.error});
};

const signup = async (req, resp) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (user) {
      resp.redirect("/?error=Username%20already%20exist");
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      await userModel.create({ name, email, username, password: hashPassword });
      resp.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

const loginForm = (req, resp) => {
  resp.render("login", {Error:req.query.error});
};

const login = async (req, resp) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.username = username;
      resp.redirect("/dashboard");
    } else {
      resp.redirect("/login?error=Incorrect%20Username%20or%20Password");
    }
  } catch (error) {
    console.log(error);
  }
};

const dashboard = async (req, resp) => {
  try {
    const emps = await empModel.find();
    resp.render("dashboard", { emps: emps, username: req.session.username });
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, resp) => {
  try {
    req.session.destroy();
    resp.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signupForm, signup, loginForm, login, dashboard, logout };
