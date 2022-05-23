const express = require("express");
const bodyparser = require("body-parser");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));

//routes---------------------------------------------------------------------------------------------------
router.get("/:testid",function(req,res){
    console.log(req.body)
    const user = req.cookies.User;
    const testId = req.params.testid;
    const qno = 1;
    res.render("testportal/testportal.ejs",{testid : testId , qno : qno , user : user});
});

router.post("/:testid",function(req,res){
    const testId = req.params.testid;
    res.redirect("/testplatform/result/"+testId);
});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;