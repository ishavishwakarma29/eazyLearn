const express = require("express");
const bodyparser = require("body-parser");
// const Userteam = require("../../database/userteam");
const Teamdetail = require("../../database/teamdetails");
// const User = require("../../database/userinfo");
const Admin = require("../../database/admininfo");


//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({ extended: true }));
router.use(express.static("public"));



//routes---------------------------------------------------------------------------------------------------
router.get("/:teamid", function (req, res) {
    const teamId = req.params.teamid;
    const admin = req.cookies.teacherEmail;
    Teamdetail.findOne({ team_id: teamId }, function (err, data_userteam) {
        const Users = data_userteam.users;
        const announcement = data_userteam.announcement;
        Admin.findOne({ email: admin }, function (err, data_admin) {
            const name = data_admin.name;
            res.render("admin/mainportal/insideteamview.ejs", { users: Users, teamid: teamId, announcement: announcement ,admin :name});
        });
    });

});


router.post("/:teamid", function (req, res) {
    const msg = req.body.message;
    const teamId = req.params.teamid;
    Teamdetail.findOneAndUpdate({ team_id: teamId }, { $push: { announcement: msg } }, function (err_update, update) {
        res.redirect("/admin/teamid/" + teamId);
    });
    // res.redirect("/admin/teamid/"+teamId);
});


//exports------------------------------------------------------------------------------------------------------
module.exports = router;