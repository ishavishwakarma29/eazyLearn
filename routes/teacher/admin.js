const express = require("express");
const bodyparser = require("body-parser");
const assignment = require("./assingment");
const createTeam = require("./createteam");
const viewresult = require("./viewresult");
const Admin = require("../../database/admininfo");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));
router.use("/assignment",assignment);
router.use("/createteam",createTeam);
router.use("/viewresult",viewresult);

//routes---------------------------------------------------------------------------------------------------
router.get("/",function(req,res){
    const admin = req.cookies.teacherEmail;
    Admin.findOne({email:admin},function(err,data_admin){
        const name = data_admin.name;
        res.render("admin/mainportal/adminteam.ejs",{admin:name});
    });
});

router.post("/",function(req,res){

});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;