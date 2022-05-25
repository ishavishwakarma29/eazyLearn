const express = require("express");
const bodyparser = require("body-parser");
const Team = require("../../database/team");
const Userteam = require("../../database/userteam");
const Teamdetail = require("../../database/teamdetails");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({ extended: true }));
router.use(express.static("public"));

//routes---------------------------------------------------------------------------------------------------
router.get("/", function (req, res) {
    const user = req.cookies.User;
    res.render("userinterface/jointeam.ejs" ,{name: user, firstLetter: user[0]});
});

router.post("/", function (req, res) {
    const teamId = req.body.teamid;
    res.redirect("/user/jointeam/"+teamId);
});

router.get("/:teamid", function (req, res) {
    const teamId = req.params.teamid;
    const User = req.cookies.User;
    Team.findOne({ team_id: teamId }, function (err, data_team) {
        if (data_team) {
            Userteam.findOne({ user: User ,team_id:teamId}, function (err_user, data_user) {
                if (!data_user) {
                    const newteamuser = new Userteam({
                        user: User,
                        team_id: teamId
                    });
                    newteamuser.save();
                    Teamdetail.findOneAndUpdate({ team_id: teamId }, { $push: { users: User } }, function (err_update, update) {

                    });
                    res.redirect("/user");
                }
                else {
                    console.log("user already exists");
                    res.redirect("/user");
                }
            });

        }
        else {
            console.log("no team exits of entered value");
            res.redirect("/user");
        }
    });

});

router.post("/:teamid", function (req, res) {
    const teamId = req.params.teamid;
    const User = req.cookies.User;
    Team.findOne({ team_id: teamId }, function (err, data_team) {
        if (data_team) {
            Userteam.findOne({ user: User }, function (err_user, data_user) {
                if (!data_user) {
                    const newteamuser = new Userteam({
                        user: User,
                        team_id: teamId
                    });
                    newteamuser.save();
                    Teamdetail.findOneAndUpdate({ team_id: teamId }, { $push: { users: User } }, function (err_update, update) {

                    });
                    res.redirect("/user");
                }
                else {
                    console.log("user already exists");
                    res.redirect("/user");
                }
            });

        }
        else {
            console.log("no team exits of entered value");
            res.redirect("/user");
        }
    });
});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;