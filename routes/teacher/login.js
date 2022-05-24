const express = require("express");
const bodyparser = require("body-parser");
const md5 = require('md5');
const Admin = require("../../database/admininfo");


//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));


//routes---------------------------------------------------------------------------------------------------
router.get("/",function(req,res){
    res.render("teacherlogin/login.ejs");
});

router.post("/",function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    Admin.findOne({email:email},function(err,data){
        if(!err)
        {
            if(!data){
                console.log("user doesn't found");
                res.render("teacherlogin/login.ejs");
            }
            else{
                console.log("userfound");
                if(data.password == md5(password))
                {
                    console.log("correct credentials entered");
                    let options = {
                        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                    }
                    res.cookie("teacherEmail", email, options);
                    res.redirect("/admin");
                }
                else
                {
                    console.log("passowrd doesn't match");
                    res.render("teacherlogin/login.ejs");
                }
            }
        }
        else
        {   
            console.log("an error occured");
            res.render("teacherlogin/login.ejs");
        }
    });
    
});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;