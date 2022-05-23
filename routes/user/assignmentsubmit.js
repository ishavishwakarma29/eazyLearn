const express = require("express");
const bodyparser = require("body-parser");
const Tassign =require("../../database/tassignment");
const Admin = require("../../database/admininfo");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));

//routes---------------------------------------------------------------------------------------------------
router.get("/:assignment_id",function(req,res){
    const assignment_id = req.params.assignment_id;
    Tassign.findOne({_id:assignment_id},function(err,data){
        console.log(data);
        // const admin = data.admin;
        // console.log(admin);
        // Admin.findOne({email:admin},function(err2,data_admin){
        //     const subject = data_admin.subject;
        //     console.log(subject);
        //     res.render("userinterface/assignmentsubmit.ejs",{data:data,subject:subject});
        // });
        res.render("userinterface/assignmentsubmit.ejs",{data:data,subject:"english"});
    });
});

router.post("/",function(req,res){

});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;