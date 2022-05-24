//including npm pakages -------------------------------------------------------------------
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cookieParser = require('cookie-parser');


//route file require ---------------------------------------------------------------------
const login = require("./routes/login");
const signupuser = require("./routes/signupuser");

//admin----------------------------------------------
const tlogin = require("./routes/teacher/login");
const tsignup = require("./routes/teacher/signup");
const createtest = require("./routes/test-creation/testinfo");
const admin = require("./routes/teacher/admin");


//test route files-----------------------------------
const testplatform = require("./routes/test/testplatform");

//api -----------------------------------------------
const maintestportalapi = require("./api/maintestportal");
const getresultapi = require("./api/getresultapi");

//user ---------------------------------------------
const user = require("./routes/user/assignmentsubmit");



//middlewares ----------------------------------------------------------------------------
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());


//extra middleware ----------------------------------------------------------------------
app.use("/login",login);
app.use("/signup",signupuser);
app.use("/tlogin",tlogin);
app.use("/tsignup",tsignup);
app.use("/testplatform",testplatform);
app.use("/createtest",createtest);
app.use("/api/testportalmain",maintestportalapi);
app.use("/api/getresult",getresultapi);
app.use("/admin",admin);
app.use("/user/assignment",user);

//routes -----------------------------------------------------------------------------------
app.get("/",function(req,res)
{
  const name = "sambhav";
  res.render("allBatches.ejs",{name:name , firstLetter:name[0]});
});
app.get("/xyz",function(req,res)
{
  res.render("test-create/qo.ejs",{path:"jdjkaj"});
});
app.post("/xyz",function(req,res)
{
  console.log(req.body);
});


//listen port -------------------------------------------------------------------------------------------------
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
