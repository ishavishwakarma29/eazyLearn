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
            Testinfo.findOne({test_id:testId},function(err3,data_testinfo){
                const getmarks = data_testinfo.marks * correctanswer;
                Savedresponse.findOneAndUpdate({test_id:testId, user:user},{marks:getmarks},function(errupdate,update){

                });
                res.render("testportal/result.ejs",{total:no_of_question,tattempted:tattempted,correctanswer:correctanswer,incorrect:incorrectanswer,getmarks:getmarks,accuracy:accuracy});
            });
            
        });
    });

    
});

router.post("/",function(req,res){

});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;