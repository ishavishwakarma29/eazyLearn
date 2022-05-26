const express = require("express");
const bodyparser = require("body-parser");


//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));


//routes---------------------------------------------------------------------------------------------------
router.get("/:rooid",function(req,res){
    res.render("video/video.ejs");
});


//exports------------------------------------------------------------------------------------------------------
module.exports = router;