const express = require("express");
const bodyparser = require("body-parser");
const assignment = require("./assingment");
const createTeam = require("./createteam");

//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));
router.use("/assignment",assignment);
router.use("/createteam",createTeam);

//routes---------------------------------------------------------------------------------------------------
router.get("/",function(req,res){
    
});

router.post("/",function(req,res){

});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;