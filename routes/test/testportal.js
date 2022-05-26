const express = require("express");
const bodyparser = require("body-parser");
const Testinfo = require("../../database/testinfo");
const Testqo = require("../../database/qo");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));

//routes---------------------------------------------------------------------------------------------------
router.get("/:testid",function(req,res){
    const user = req.cookies.User;
    const testId = req.params.testid;
    const qno = 1;
    
    Testinfo.findOne({test_id:testId},function(err,data){
        Testqo.findOne({test_id:testId},function(err,data_qo){
            const no_of_question = data_qo.qo.length;
            res.render("testportal/testportal.ejs",{testid : testId , qno : qno , user : user,time : data.time ,data:data , nos : no_of_question});
        });
    });

    // setTimeout(testEnd, 3000);
    // function testEnd(){
    //     console.log("hello");
    // }

    
});

router.post("/:testid",function(req,res){
    const testId = req.params.testid;
    res.redirect("/testplatform/warning/"+testId);
});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;