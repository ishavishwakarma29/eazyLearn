const express = require("express");
const bodyparser = require("body-parser");
const testportal = require("./testportal");
const testuserinfo = require("./testuserinfo");
const warning = require("./warning");
const result = require("./result");
const reviewtest = require("./reviewtest");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));
router.use("/test",testportal);
router.use("/testinfo",testuserinfo);
router.use("/warning",warning);
router.use("/result",result);
router.use("/reviewtest",reviewtest);

//routes---------------------------------------------------------------------------------------------------
router.get("/",function(req,res){
    res.render("testportal/entertestid.ejs");
});

router.post("/",function(req,res){
    const testID = req.body.testid;
    res.redirect("/testplatform/testinfo/"+testID);
});

router.get("/starttest/:testid",function(req,res){
    const testId = req.params.testid;
    const user = req.cookies.User;



    res.redirect("/testplatform/test/"+testId);

});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;