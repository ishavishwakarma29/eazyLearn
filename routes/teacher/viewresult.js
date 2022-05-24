const express = require("express");
const bodyparser = require("body-parser");
const http = require("http");


//middlewares ------------------------------------------------------------------------------------------
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static("public"));


//routes---------------------------------------------------------------------------------------------------
router.get("/",function(req,res){
    res.render("admin/viewresult/viewresult_idsearch.ejs",{warningtext:""});
});

router.post("/",function(req,res){
    const testId = req.body.testid;
    res.redirect("viewresult/"+testId);
});

router.get("/:testid",function(req,res){
    const testId = req.params.testid;
    const admin = req.cookies.teacherEmail;
    const url = "http://localhost:3000/api/getresult/"+testId+"/"+admin;
    http.get(url,function(response){
        response.on("data",function(data){
            const studentdata = JSON.parse(data);
            console.log(studentdata);
            if(studentdata.status)
            {
                res.render("admin/viewresult/viewresult.ejs",{data : studentdata.data});
            }
            else{
                res.render("admin/viewresult/viewresult_idsearch.ejs",{warningtext : studentdata.data});
            }
        })
    });
    // res.render("admin/viewresult/viewresult.ejs")
}); 

router.post("/:testid",function(req,res){

});

//exports------------------------------------------------------------------------------------------------------
module.exports = router;