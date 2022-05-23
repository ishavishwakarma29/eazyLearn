const express = require("express");
const bodyparser = require("body-parser");
const Testinfo = require("../../database/testinfo");
const Admin = require("../../database/admininfo");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));

//routes---------------------------------------------------------------------------------------------------

router.get("/:testid",function(req,res){
    if(req.cookies.User){
        const user = req.cookies.User;
        const testId = req.params.testid;
        Testinfo.findOne({test_id:testId},function(err,data_testinfo){
            if(data_testinfo){
                console.log(data_testinfo);
                Admin.findOne({email: data_testinfo.email},function(error,data_admin){
                    console.log(data_admin);
                    res.render("testportal/testuserinfo.ejs",{data:data_testinfo,user:user,tname : data_admin.name , tsub : data_admin.subject});
                });
            }
            else
            {
                console.log("test doesn't exits");
            }
        });
    }
    else{
        console.log("user is not logged in ")
        //redirect to login page
        res.redirect("/login");
    }
});

router.post("/:testid",function(req,res){

});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;