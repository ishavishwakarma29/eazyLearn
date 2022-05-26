const express = require("express");
const bodyparser = require("body-parser");
const Teamdetail = require("../../database/teamdetails");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({ extended: true }));
router.use(express.static("public"));

//routes---------------------------------------------------------------------------------------------------
router.get("/:teamid", function (req, res) {
    const teamId = req.params.teamid;
    const User = req.cookies.User;
    Teamdetail.findOne({ team_id: teamId }, function (err, data) {
        const announcement = data.announcement;
        res.render("userinterface/overview.ejs", { msg: announcement ,teamid : teamId , user:User});
    });

});

router.post("/:teamid", function (req, res) {
    const teamId = req.params.teamid;
    const User = req.cookies.User;
    Teamdetail.findOne({ team_id: teamId }, function (err, data) {
        const announcement = data.announcement;
        res.render("userinterface/overview.ejs", { msg: announcement ,teamid : teamId ,user:User});
    });
});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;