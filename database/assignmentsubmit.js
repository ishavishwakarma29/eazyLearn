const mongoose = require('mongoose');

//mongodb-----------------------------------------------------------------------------------------------------
mongoose.connect("mongodb+srv://sam233:42119243Sam@cluster0.bgt3y.mongodb.net/userwoc", {useNewUrlParser: true});

const uassignSchema = new mongoose.Schema({
    assignment_id : String,
    user : String,
    filename : String,
    submissionTime : String
});

const Assignsubmit = mongoose.model("Assignsubmit", uassignSchema);

// --------------------------------------------------------------------------------------------------------------

module.exports = Assignsubmit;