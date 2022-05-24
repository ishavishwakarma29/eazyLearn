const express = require("express");
const bodyparser = require("body-parser");
const Team = require("../../database/team");
const Admin = require("../../database/admininfo");
const randomstring = require("randomstring");


//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({ extended: true }));
router.use(express.static("public"));


//routes---------------------------------------------------------------------------------------------------
router.get("/", function (req, res) {
    const admin = req.cookies.teacherEmail;
    Admin.findOne({ email: admin }, function (err, data_admin) {
        const name = data_admin.name;
        res.render("admin/mainportal/createteam.ejs", { admin: name });
    });
});

router.post("/", function (req, res) {
    const admin = req.cookies.teacherEmail;
    const teamname = req.body.teamname;
    const classname = req.body.classname;
    const timing = req.body.timing;

    const teamId = randomstring.generate({
        length: 12
    });

    const team = new Team({
        admin: admin,
        team_id: teamId,
        teamname: teamname,
        timing: timing,
        classname: classname
    });

    team.save();

    console.log("team successfully created");
    res.redirect("/admin/createteam/"+teamId);

});

router.get("/:teamid",function(req,res){
    const admin = req.cookies.teacherEmail;
    const teamId = req.params.teamid;
    const link = "/admin/createteam/"+teamId;
    Admin.findOne({ email: admin }, function (err, data_admin) {
        const name = data_admin.name;
        res.render("admin/mainportal/linkteam.ejs", { admin: name ,teamid : teamId,link : link});
    });
});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;