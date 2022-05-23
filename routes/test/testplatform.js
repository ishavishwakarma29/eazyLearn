const express = require("express");
const bodyparser = require("body-parser");
const testportal = require("./testportal");
const testuserinfo = require("./testuserinfo");
const warning = require("./warning");
const result = require("./result");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));
router.use("/test",testportal);
router.use("/testinfo",testuserinfo);
router.use("/warning",warning);
router.use("/result",result);

//routes---------------------------------------------------------------------------------------------------
router.get("/",function(req,res){
    
});

router.post("/",function(req,res){

});

router.get("/starttest/:testid",function(req,res){
    const testId = req.params.testid;
    const user = req.cookies.User;



    res.redirect("/testplatform/test/"+testId);

});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;