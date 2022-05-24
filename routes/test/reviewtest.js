const express = require("express");
const bodyparser = require("body-parser");
const Savedresponse = require("../../database/savedresponse");
const Testqo = require("../../database/qo");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));

//routes---------------------------------------------------------------------------------------------------
router.get("/:testid",function(req,res){
    const testId = req.params.testid;
    const user = req.cookies.User;
    const sendobect =[];
    Savedresponse.findOne({test_id:testId,user :user},function(err , data_saveresponse){
        Testqo.findOne({test_id:testId},function(err2,data_qo){
            const response = data_saveresponse.Response;
            const questions = data_qo.qo;
            createobject();
            async function createobject(){
                questions.forEach(element => {
                    const tempobject = {
                        question : element.question,
                        options : element.options,
                        correct : element.correct,
                        response : response[element.qno-1]  
                    }

                    sendobect.push(tempobject);
                });
                
            }
            // console.log(sendobect);
            res.render("testportal/reviewtest.ejs",{data:sendobect});
        });
    });

    
});

router.post("/",function(req,res){
    
});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;