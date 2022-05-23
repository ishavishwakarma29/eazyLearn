const express = require("express");
const bodyparser = require("body-parser");
const User = require("../database/userinfo");
const nodemailer = require('nodemailer');
const md5 = require("md5");

//transporter----------------------------------------------------------------------------------------
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mnnitconf@gmail.com',
    pass: '421100319243#&drive'
  }
});


//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({ extended: true }));
router.use(express.static("public"));


//routes---------------------------------------------------------------------------------------------------
router.get("/", function (req, res) {
  res.render("signupuser.ejs", { errorMsg: "" });
});

router.post("/", function (req, res) {
  email = req.body.email;
  password = req.body.password;
  repassword = req.body.repassword;

  User.findOne({ email: email }, function (err, data) {
    if (!err) {
      if (data) {
        res.render("signupuser.ejs", { errorMsg: "User Already Exists" });
      }
      else {
        if (password == repassword) {


          console.log("password matched ,referring to the otp verfication");
          const sign_data = {
            email: email,
            password: password
          }
          let options = {
            expires: new Date(Date.now() + 10 * 60 * 1000)
          }
          res.cookie("wocusersignup", sign_data, options);
          res.redirect("/signup/auth");
        }
        else {
          res.render("signupuser.ejs", { errorMsg: "Password doesn't match" });
        }
      }
    }
    else {
      console.log("An error Occured");
      console.log(err);
      res.redirect("/signup");
    }
  });
});

router.get("/auth", function (req, res) {
  const otp = 100000 + Math.floor(Math.random() * 899998) + 1;

  const mailOptions = {
    from: 'mnnitconf@gmail.com',
    to: email,
    subject: 'otp verification',
    html: "<h2>your OTP for <strong>student portal</strong> is <h2><br> <h1>" + otp + "</h1>"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.render("signupuser.ejs", { errorMsg: "error occured while sending otp" });
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  let options = {
    expires: new Date(Date.now() + 10 * 60 * 1000)
  }
  res.cookie("wocuserotp", otp, options);

  res.render("user/otp.ejs", { email: req.cookies.wocusersignup.email, errorMsg: "" });
});

router.post("/auth", function (req, res) {
  const otp = req.cookies.wocuserotp;
  const email = req.cookies.wocusersignup.email;
  let password = req.cookies.wocusersignup.password;
  const ansotp = req.body.otp;
  if (ansotp == otp) {
    console.log("otp matched");
    password = md5(password);

    const user = new User({
      email: email,
      password: password
    });
    user.save();
    res.clearCookie("wocusersignup");
    res.clearCookie("wocuserotp");
    console.log("user successfully saved");

    let options = {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    }
    res.cookie("User", email, options);
    res.send("cookie saved");
    
  }
  else {
    console.log("wrong otp");
    res.render("user/otp.ejs", { email: email, errorMsg: "Wrong OTP entered" });
  }
});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;