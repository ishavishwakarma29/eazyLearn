const express = require("express");
const bodyparser = require("body-parser");
const randomstring = require("randomstring");
const Testinfo = require("../../database/testinfo");
const qo = require("../../database/qo");
const qopage = require("./qo");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));
router.use("/qo",qopage);


//routes---------------------------------------------------------------------------------------------------
router.get("/info",function(req,res){
    res.render("test-create/testinfo.ejs");
});

router.post("/info",function(req,res){
    const testId = randomstring.generate({
        length: 8,
        capitalization: 'lowercase'
    });
    
    const testName = req.body.test_name;
    const time = req.body.time;
    const marks = req.body.marks;

    const data = new Testinfo({
        email: req.cookies.teacherEmail,
        test_name: testName,
        time: time,
        marks: marks,
        test_id: testId
    });

    data.save();

    res.redirect("/createtest/qo/"+testId);


});

router.get("/link",function(req,res){
    const testId = req.query.Id;
    const link = "http://localhost:3000/testplatform/testinfo/"+testId;

    qo.findOne({test_id:testId},function(err1, data_qo){
        const nos = data_qo.qo.length;
        Testinfo.findOne({test_id:testId},function(err2,data_tinfo){
            const markperquestion = data_tinfo.marks;
            const tmarks = nos*markperquestion;
            console.log(tmarks);
            Testinfo.findOneAndUpdate({test_id:testId},{total_marks:tmarks},function(err3,update){
            });
        });
    });
    res.render("test-create/linkpage.ejs",{id:testId , link:link});
});

router.post("/link",function(req,res){
    const testId = req.query.Id;
    const link = "http://localhost:3000/testplatform/testinfo/"+testId;

    qo.findOne({test_id:testId},function(err1, data_qo){
        const nos = data_qo.qo.length;
        Testinfo.findOne({test_id:testId},function(err2,data_tinfo){
            const markperquestion = data_tinfo.marks;
            const tmarks = nos*markperquestion;
            console.log(tmarks);
            Testinfo.findOneAndUpdate({test_id:testId},{total_marks:tmarks},function(err3,update){
            });
        });
    });
    res.render("test-create/linkpage.ejs",{id:testId , link:link});
});

router.get("/previewtest",function(req,res){

    const testId = req.query.id;
    qo.findOne({test_id: testId},function(err,data){
        console.log(data.qo);
        res.render("test-create/previewtest.ejs",{render:data.qo});
    });
});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;