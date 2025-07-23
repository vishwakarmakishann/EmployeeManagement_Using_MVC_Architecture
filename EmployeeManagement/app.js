const connection = require("./db/db");
const express = require("express");
const router = require("./routes/empRoutes");
const session = require('express-session');

const app = express();
connection();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret:"test",
  saveUninitialized:false,
  resave:false
}))
app.use(express.static('style'));

app.set("view engine", "ejs");
app.use("/", router);

app.listen(4000, () => {
  console.log("running...");
});