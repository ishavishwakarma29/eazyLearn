const express = require("express");
const bodyparser = require("body-parser");
const Tassign = require("../../database/tassignment");
const Admin = require("../../database/admininfo");
const randomstring = require("randomstring");
const multer = require('multer');
const Assignsubmit = require("../../database/assignmentsubmit");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({ extended: true }));
router.use(express.static("public"));



//-----------------------------------------------------
const extraname = randomstring.generate({
    length: 12,
    capitalization: 'lowercase'
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/submitassignment');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + extraname + file.originalname);
    }
});

var upload = multer({ storage: storage }).single("submitassignment");
//-----------------------------------------------------------------



//routes---------------------------------------------------------------------------------------------------
router.get("/:assignment_id", function (req, res) {
    const assignment_id = req.params.assignment_id;
    Tassign.findOne({ _id: assignment_id }, function (err, data) {
        const info = data;
        // console.log(info);
        const admin = data.admin;
        // console.log(admin);
        Admin.findOne({ email: admin }, function (err2, data_admin) {
            const subject = data_admin.subject;
            // console.log(data_admin);
            // console.log(subject);
            res.render("userinterface/assignmentsubmit.ejs", { data: info, subject: subject });
        });
    });
});

router.post('/:assignment_id', upload, function (req, res, next) {
    const assignment_id = req.params.assignment_id;
    const user = req.cookies.User;
    const currentdate = new Date();
    const datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    const assignment = new Assignsubmit({
        assignment_id: assignment_id,
        user: user,
        filename: req.file.filename,
        submissionTime: datetime
    });

    assignment.save();
    res.send("assignment saved");
});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;