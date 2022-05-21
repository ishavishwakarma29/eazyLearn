const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("login",  {errorMsg: ""});
});

app.post("/", function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  // console.log(email, password);

  if(email === "ishavishwakarma29@gmail.com" && password === "123456") {
    res.render("allBatches", {firstLetter: 'I', name: "Isha Vishwakarma"});
  }

  res.render("login", {errorMsg: "Enter correct credentials!!!"});
})

app.get("/:studentName", function(req, res){
  const name = req.params.studentName;
  res.render("allBatches", {firstLetter: name.charAt(0), name: name});
});


app.get("/:studentName/chats", function(req, res){
  const navHeading = req.params.studentName;
  res.render("chats", {firstLetter: navHeading.charAt(0), name: navHeading});
});

app.get("/:student/teams/:teamName", function(req, res){
  const heading = req.params.teamName;
  const nav = req.params.student;
  res.render("batchOverview", {teamName: heading, firstLetter: nav.charAt(0), name: nav});
});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
