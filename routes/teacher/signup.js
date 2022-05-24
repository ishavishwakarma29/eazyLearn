const express = require("express");
const bodyparser = require("body-parser");
const md5 = require("md5");
const Admin = require("../../database/admininfo")


//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({ extended: true }));
router.use(express.static("public"));


//routes---------------------------------------------------------------------------------------------------
router.get("/", function (req, res) {
    res.render("teacherlogin/signup.ejs");
});

router.post("/", function (req, res) {
    const name = req.body.name;
    const subject = req.body.subject;
    const org = req.body.org;
    const contact = req.body.contact;
    const email = req.body.email;
    const password = req.body.password;
    const repassword = req.body.repassword;


    Admin.findOne({ email: email }, function (err, data) {
        if (!err) {
            if (data) {
                console.log("user already exits");
                res.render("teacherlogin/signup.ejs");
            }
            else {
                if (password == repassword) {
                    console.log("password matched ");

                    const admin_data = new Admin({
                        email: email,
                        name: name,
                        subject: subject,
                        organisation: org,
                        contactNo: contact,
                        password: md5(password)
                    });

                    admin_data.save();
                    console.log("user successfull registered");
                    let options = {
                        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                    }
                    res.cookie("teacherEmail", email, options);
                    res.redirect("/admin");
                }
                else {
                    console.log("password not matched");
                    res.render("teacherlogin/signup.ejs");
                }
            }
        }
        else {
            console.log("An error Occured");
            console.log(err);
            res.redirect("/tsignup");
        }
    });
});


//exports------------------------------------------------------------------------------------------------------
module.exports = router;