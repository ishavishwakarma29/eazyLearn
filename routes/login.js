const express = require("express");
const bodyparser = require("body-parser");
const md5 = require('md5');
const User = require("../database/userinfo");


//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));


//routes---------------------------------------------------------------------------------------------------
router.get("/",function(req,res){
    res.render("login.ejs",{errorMsg:""});
});

router.post("/",function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email:email},function(err,data){
        if(!err)
        {
            if(!data){
                res.render("login.ejs",{errorMsg:"User doesn't Exits"});
            }
            else{
                console.log("userfound");
                if(data.password == md5(password))
                {
                    console.log("correct credentials entered");
                    let options = {
                        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                    }
                    res.cookie("User", email, options);
                    res.redirect("/user");
                }
                else
                {
                    res.render("login.ejs",{errorMsg:"Wrong Password Entered"});
                }
            }
        }
        else
        {
            res.render("login.ejs",{errorMsg:"An Error Occured"});
        }
    });
    
});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;