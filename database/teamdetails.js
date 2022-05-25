const mongoose = require('mongoose');

//mongodb-----------------------------------------------------------------------------------------------------
mongoose.connect("mongodb+srv://sam233:42119243Sam@cluster0.bgt3y.mongodb.net/userwoc", {useNewUrlParser: true});

const teamdetailSchema = new mongoose.Schema({
    admin : String,
    team_id : String,
    users : [],
    test : [],
    assignment : [],
    announcement : []
});

const Teamdetail = mongoose.model("Teamdetail", teamdetailSchema);

// --------------------------------------------------------------------------------------------------------------

module.exports = Teamdetail;