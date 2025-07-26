const express = require("express");
const userRouter = require("./routes/userRoutes");
const empRouter = require('./routes/empRoutes');
const connectDB = require("./config/db");
const session = require("express-session");
const methodOverride = require('method-override');

const app = express();
connectDB();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret:"test",
    saveUninitialized:false,
    resave:false
}));
app.use(express.static("style"));
app.use(methodOverride("_method"));
app.use("/", userRouter);
app.use("/", empRouter); 

app.listen(4000, () => {
  console.log("Running...");
});