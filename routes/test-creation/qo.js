const express = require("express");
const bodyparser = require("body-parser");
const randomstring = require("randomstring");
const qo = require("../../database/qo");


//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({ extended: true }));
router.use(express.static("public"));

//routes ------------------------------------------------------------------------------------------------
router.get("/:testId", function (req, res) {
    const testId = req.params.testId;
    const path = "/createtest/qo/" + testId;
    const path2 = "/createtest/link?Id="+testId;
    res.render("test-create/qo.ejs", { path: path, qno: "1" ,path2 : path2});

});

router.post("/:testId", function (req, res) {
    const testId = req.params.testId;
    const path = "/createtest/qo/" + testId;
    const path2 = "/createtest/link?Id="+testId;
    const question = req.body.question;
    const opt1 = req.body.opt1;
    const opt2 = req.body.opt2;
    const opt3 = req.body.opt3;
    const opt4 = req.body.opt4;
    const correct_option = req.body.correct_option;
    const qno = req.body.qno;

    const object = {
        qno: qno,
        question: question,
        options: [opt1, opt2, opt3, opt4],
        correct: correct_option
    }

    // Adventure.findOne({ country: 'Croatia' }, function (err, adventure) {});

    qo.findOne({test_id: testId},function(err,check_data){
        if(err)
        {
            console.log(err);
        }
        else{
            if(check_data)
            {
                console.log("data exists");
                qo.findOneAndUpdate({ test_id: testId }, {$push:{qo:object}},function(error,success){

                });
            }
            else {
                const new_id = new qo({
                    test_id :testId,
                    qo : object
                });
                new_id.save();
            }
        }
    });
    
    res.render("test-create/qo.ejs", { path: path, qno: Number(qno)+1 , path2:path2 });
});



//exports------------------------------------------------------------------------------------------------------
module.exports = router;
