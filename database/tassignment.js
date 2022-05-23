const mongoose = require('mongoose');

//mongodb-----------------------------------------------------------------------------------------------------
mongoose.connect("mongodb+srv://sam233:42119243Sam@cluster0.bgt3y.mongodb.net/userwoc", {useNewUrlParser: true});

const tassignSchema = new mongoose.Schema({
    assignment_name : String,
    admin : String,
    teamcode : String,
    dueDate : String,
    dueTime : String,
    instructions : String,
    filename : String,
    path : String
});

const Tassign = mongoose.model("Tassign", tassignSchema);

// --------------------------------------------------------------------------------------------------------------

module.exports = Tassign;