//api of main test portal 

const express = require("express");
const bodyparser = require("body-parser");
const Testqo = require("../database/qo");
const Savedresponse = require("../database/savedresponse");


//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({ extended: true }));
router.use(express.static("public"));
router.use(bodyparser.json());

//routes---------------------------------------------------------------------------------------------------
router.get("/", function (req, res) {
    res.send("home route of testportal api")
});

router.post("/", function (req, res) {
    // console.log(req.body);
    const testId = req.body.test_id;
    const qno = req.body.question_id;
    const user = req.body.user;
    const selected_option = req.body.selected_option;


    Testqo.findOne({ test_id: testId }, function (err, data) {
        // console.log(data);
        const question = data.qo[qno].question;
        const options = data.qo[qno].options;
        const qobj = {
            question: question,
            options: options
        }
        // console.log(qobj);
        res.send(qobj);
    });

    if (user) {
        Savedresponse.findOne({ test_id: testId, user: user }, function (err, data) {
            if (data) {
                Savedresponse.findOneAndUpdate({ test_id: testId, user: user }, { $push: { Response: selected_option } }, function (error, updatadata) {

                });
            }
            else {
                const newstudent = new Savedresponse({
                    test_id: testId,
                    user: user,
                    Response: [selected_option]
                });

                newstudent.save();
            }
        });
    }

});


router.post("/saveonly", function (req, res) {
    // console.log(req.body);
    const testId = req.body.test_id;
    const qno = req.body.question_id;
    const user = req.body.user;
    const selected_option = req.body.selected_option;


    // Testqo.findOne({ test_id: testId }, function (err, data) {
    //     // console.log(data);
    //     const question = data.qo[qno].question;
    //     const options = data.qo[qno].options;
    //     const qobj = {
    //         question: question,
    //         options: options
    //     }
    //     // console.log(qobj);
    //     res.send(qobj);
    // });

    if (user) {
        Savedresponse.findOne({ test_id: testId, user: user }, function (err, data) {
            if (data) {
                Savedresponse.findOneAndUpdate({ test_id: testId, user: user }, { $push: { Response: selected_option } }, function (error, updatadata) {

                });
            }
            else {
                const newstudent = new Savedresponse({
                    test_id: testId,
                    user: user,
                    Response: [selected_option]
                });

                newstudent.save();
            }
        });
    }

});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;