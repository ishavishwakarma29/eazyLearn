const mongoose = require('mongoose');

//mongodb-----------------------------------------------------------------------------------------------------
mongoose.connect("mongodb+srv://sam233:42119243Sam@cluster0.bgt3y.mongodb.net/userwoc", {useNewUrlParser: true});

const testinfoSchema = new mongoose.Schema({
    email: String,
    test_name:String,
    time: String,
    marks:String,
    test_id:String,
    total_marks : String
});

const Testinfo = mongoose.model("Testinfo", testinfoSchema);

// --------------------------------------------------------------------------------------------------------------

module.exports = Testinfo;