const express = require("express");
const bodyparser = require("body-parser");
const multer = require('multer');
const Tassign = require("../../database/tassignment");
const randomstring = require("randomstring");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));

//-----------------------------------------------------
const extraname = randomstring.generate({
    length: 12,
    capitalization: 'lowercase'
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/assignment');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + extraname+ file.originalname);
    }
});

var upload = multer({ storage: storage }).single("assignmentFile");
//-----------------------------------------------------------------



//routes---------------------------------------------------------------------------------------------------
router.get("/",function(req,res){
    res.render("admin/assignment/assignment.ejs");
});




router.post('/', upload, function (req, res, next) {

    const assignment_name = req.body.assignmentName;
    const admin = req.cookies.teacherEmail;
    const teamCode = req.body.teamCode;
    const duedate = req.body.dueDate;
    const dueTime = req.body.dueTime;
    const instructions = req.body.instructions;
    const filename = req.file.filename;
    const path = req.file.path;

    const assignment = new Tassign({
        assignment_name: assignment_name,
        admin : admin,
        teamcode: teamCode,
        dueDate: duedate,
        dueTime: dueTime,
        instructions: instructions,
        filename: filename,
        path: path
    });

    assignment.save();
});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;