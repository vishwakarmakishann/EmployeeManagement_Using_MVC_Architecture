const {empModel, userModel} = require("../model/Model");
const bcrypt = require("bcryptjs");

const getEmp = async (req, resp) => {
  try {
    if (!req.session.user) {
    resp.end("Access Denied...");
  } else {
    const emp = await empModel.find();
    resp.render("index", { emp: emp, username: req.session.user});
  }
    
  } catch (error) {
    console.log(error);
  }
};

const addEmpForm = async (req, resp) => {
  try {
    if (!req.session.user) {
    resp.end("Access Denied...");
  } else {
    resp.render("addEmpForm");
    
  }
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
    if (!req.session.user) {
    resp.end("Access Denied...");
  } else {
    
    const emp = await empModel.findOne({ _id: req.params.id });
    resp.render("updateEmpForm", { emp: emp });
  }
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
  
    if (!req.session.user) {
    resp.end("Access Denied...");
  } else {
    
  }
    const emp = await empModel.find({ name: req.body.name });
    resp.render("searchedEmp", { emp: emp });
  } catch (error) {
    console.log(error);
  }
};

const signupForm = (req, resp) => {
  resp.render("signup");
};

const loginForm = (req, resp) => {
  const error = req.query.error;
  resp.render("login", { error });
};

const signup = async (req,resp)=>{
  try {
    const {name, email, username, password} = req.body;
    const exist = await userModel.findOne({username});
    if(exist.username==username){
      resp.redirect("/login");
    } else {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({name, email, username, password:hashPassword});
    resp.redirect("/login");
    }
  } catch (error) {
    console.log(error);
    
  }
}

const login = async (req,resp)=>{
  try {
    const {username,password} = req.body;
    const user = await userModel.findOne({username});
    if(user && (await bcrypt.compare(password,user.password))){
      req.session.user=username;
      resp.redirect("/");
    }
    else{
      resp.redirect("/login?error=Wrong%20credentials");
    }
  } catch (error) {
    console.log(error);
    
  }
}

const logout = (req, resp)=>{
  try {
    req.session.destroy();
    resp.redirect("/login");
  } catch (error) {
    console.log(error);
    
  }
}

module.exports = {
  getEmp,
  addEmpForm,
  addEmp,
  updateForm,
  updateEmp,
  deleteEmp,
  searchEmp,
  signup,
  signupForm,
  loginForm,
  login,
  logout
};
