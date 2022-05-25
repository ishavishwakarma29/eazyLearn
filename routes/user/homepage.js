const express = require("express");
const bodyparser = require("body-parser");
const assignment = require("./assignmentsubmit");
const joinTeam = require("./jointeam");
const overview = require("./overview");
const Userteam = require("../../database/userteam");
const Team = require("../../database/team");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({ extended: true }));
router.use(express.static("public"));
router.use("/assignment", assignment);
router.use("/jointeam", joinTeam);
router.use("/overview",overview);

//routes---------------------------------------------------------------------------------------------------
router.get("/", function (req, res) {
    const user = req.cookies.User;
    let renderdata = [];
    Userteam.find({ user: user }, function (err, data_userteam) {
        createarray();
        async function createarray() {
            data_userteam.forEach(element => {
                const teamid = element.team_id;
                Team.findOne({ team_id: teamid }, function (err2, data_team) {
                    // console.log(data_team);
                    const object = {
                        teamid : teamid,
                        teamname : data_team.teamname
                    }
                    renderdata.push(object);
                });
            });
        }
        setTimeout(() => {
            // console.log(renderdata);
            res.render("userinterface/allBatches.ejs", { name: user, firstLetter: user[0] ,teams : renderdata });
        }, 5000);
        
    });
    // res.render("userinterface/allBatches.ejs", { name: user, firstLetter: user[0] });
});

router.post("/:teamid", function (req, res) {
    const teamId = req.params.teamid;
    res.redirect("/user/overview/"+teamId);
});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;