const express = require("express");
const bodyparser = require("body-parser");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));

//routes---------------------------------------------------------------------------------------------------
router.get("/",function(req,res){
    res.render("testportal/warning.ejs")
});

router.post("/",function(req,res){

});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;