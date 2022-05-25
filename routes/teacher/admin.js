const express = require("express");
const bodyparser = require("body-parser");
const assignment = require("./assingment");
const createTeam = require("./createteam");
const viewresult = require("./viewresult");
const insideteamview = require("./insideteamview");
const Admin = require("../../database/admininfo");
const Team = require("../../database/team");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));
router.use("/assignment",assignment);
router.use("/createteam",createTeam);
router.use("/viewresult",viewresult);
router.use("/teamid",insideteamview);

//routes---------------------------------------------------------------------------------------------------
router.get("/",function(req,res){
    const admin = req.cookies.teacherEmail;
    Admin.findOne({email:admin},function(err,data_admin){
        const name = data_admin.name;
        Team.find({admin : admin},function(err2,data_team){
            // console.log(data_team);
            res.render("admin/mainportal/adminteam.ejs",{admin:name,render:data_team});
        });
        
    });
});

router.post("/",function(req,res){

});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;