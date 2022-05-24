const express = require("express");
const bodyparser = require("body-parser");
const Testqo = require("../../database/qo");
const Savedresponse =require("../../database/savedresponse");
const Testinfo = require("../../database/testinfo");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));

//routes---------------------------------------------------------------------------------------------------
router.get("/:testid",function(req,res){
    const testId = req.params.testid;
    const user = req.cookies.User;
    const link = "/testplatform/warning/"+testId;
    Testqo.findOne({test_id:testId},function(err,data_qo){
        const no_of_question = data_qo.qo.length;
        Savedresponse.findOne({test_id:testId,user:user},function(err2,data_savedresponse){
            const responses = data_savedresponse.Response;
            const questionviewed = responses.length;
            let notanswered = 0;
            responses.forEach(item =>{
                if(item == 0)
                {
                    notanswered++;
                }
            });
            const tattempted = questionviewed- notanswered;
            let correctanswer = 0;
            for(var i =0 ;i<no_of_question;i++){
                if(responses[i]== data_qo.qo[i].correct)
                correctanswer++;
            }
            const incorrectanswer = tattempted-correctanswer;
            const accuracy = (correctanswer/tattempted)*100;
            const notvisited = (no_of_question - questionviewed);
            console.log(notvisited);
            Testinfo.findOne({test_id:testId},function(err3,data_testinfo){
                const getmarks = data_testinfo.marks * correctanswer;
                res.render("testportal/warning.ejs",{total:no_of_question,tattempted:tattempted,notanswered:no_of_question-tattempted,notvisited:notvisited,link: link});
            });
            
        });
    });

    
});

router.post("/:testid",function(req,res){
    const testId = req.params.testid;
    res.redirect("/testplatform/result/"+testId);
});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;