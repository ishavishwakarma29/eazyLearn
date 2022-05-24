//api of get result 

const express = require("express");
const bodyparser = require("body-parser");
const Testinfo = require("../database/testinfo");
const Savedresponse = require("../database/savedresponse");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({ extended: true }));
router.use(express.static("public"));
router.use(bodyparser.json());

//routes---------------------------------------------------------------------------------------------------
router.get("/:testid/:adminid", function (req, res) {
    const testId = req.params.testid;
    const admin = req.params.adminid;
    let sendreultobject = []
    Testinfo.findOne({ test_id: testId }, function (err, data_admincheck) {
        if (data_admincheck) {
            if (data_admincheck.email == admin) {
                console.log("teacher mathced");
                Savedresponse.find({ test_id: testId }, function (err_responses, data_responses) {
                    getdata();
                    async function getdata() {
                        data_responses.forEach(item => {
                            if (item.marks) {
                                const object = {
                                    email: item.user,
                                    marks: item.marks
                                }
                                sendreultobject.push(object);
                            }

                        });
                    }
                    const send_data = {
                        status: true,
                        data: sendreultobject
                    }
                    res.send(send_data);
                });
            }
            else {
                const send_data = {
                    status: false,
                    data: "Invalid credentials"
                }
                res.send(send_data);
            }
        }
        else {
            const send_data = {
                status: false,
                data: "Test doesn't exists"
            }
            res.send(send_data);
        }
    });

});

router.post("/:testid/:adminid", function (req, res) {
    const testId = req.params.testid;
    const admin = req.params.adminid;
    let sendreultobject = []
    Testinfo.findOne({ test_id: testId }, function (err, data_admincheck) {
        if (data_admincheck) {
            if (data_admincheck.email == admin) {
                console.log("teacher mathced");
                Savedresponse.find({ test_id: testId }, function (err_responses, data_responses) {
                    getdata();
                    async function getdata() {
                        data_responses.forEach(item => {
                            const object = {
                                email: item.user,
                                marks: item.marks
                            }
                            sendreultobject.push(object);

                        });
                    }
                    const send_data = {
                        status: true,
                        data: sendreultobject
                    }
                    res.send(send_data);
                });
            }
            else {
                const send_data = {
                    status: false,
                    data: "different owner"
                }
                res.send(send_data);
            }
        }
        else {
            const send_data = {
                status: false,
                data: "test does not exists"
            }
            res.send(send_data);
        }
    });

});
//exports------------------------------------------------------------------------------------------------------
module.exports = router;