const mongoose = require('mongoose');

//mongodb-----------------------------------------------------------------------------------------------------
mongoose.connect("mongodb+srv://sam233:42119243Sam@cluster0.bgt3y.mongodb.net/userwoc", {useNewUrlParser: true});

const sresponseSchema = new mongoose.Schema({
    test_id : String,
    user : String,
    Response : [],
    marks : String
});

const Savedresponse = mongoose.model("Savedresponse", sresponseSchema);

// --------------------------------------------------------------------------------------------------------------

module.exports = Savedresponse;