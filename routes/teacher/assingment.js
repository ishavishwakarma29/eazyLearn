const express = require("express");
const bodyparser = require("body-parser");
const multer = require('multer');
const Tassign = require("../../database/tassignment");
const Teamdetail = require("../../database/teamdetails");
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
        cb(null, './public/uploads/assignment');
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

    const _id = randomstring.generate({
        length: 20,
        capitalization: 'lowercase'
    });
    const assignment_name = req.body.assignmentName;
    const admin = req.cookies.teacherEmail;
    const teamCode = req.body.teamCode;
    const duedate = req.body.dueDate;
    const dueTime = req.body.dueTime;
    const instructions = req.body.instructions;
    const filename = req.file.filename;
    const path = req.file.path;

    const assignment = new Tassign({
        _id : _id,
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

    const msg = "assignment id : "+_id+" ("+assignment_name+") due by "+duedate+" and due time "+ dueTime;

    setTimeout(() => {
        Teamdetail.findOneAndUpdate({team_id:teamCode},{$push:{assignment:_id,announcement:msg}},function(error, update){
            res.redirect("/admin");
        });
    }, 2000);

    
});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;