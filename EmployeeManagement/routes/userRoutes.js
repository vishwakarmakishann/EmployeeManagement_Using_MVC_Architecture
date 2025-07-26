const { signupForm, signup, loginForm, login, dashboard, logout } = require("../controller/userController");
const express = require("express");
const userRouter = express.Router();

userRouter.get("/", signupForm);
userRouter.post("/signup", signup);
userRouter.get("/login",loginForm);
userRouter.post("/login",login);
userRouter.get("/dashboard", dashboard);
userRouter.get("/logout", logout);

module.exports = userRouter;
