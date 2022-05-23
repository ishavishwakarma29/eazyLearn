const mongoose = require('mongoose');

//mongodb-----------------------------------------------------------------------------------------------------
mongoose.connect("mongodb+srv://sam233:42119243Sam@cluster0.bgt3y.mongodb.net/userwoc", {useNewUrlParser: true});

const teamSchema = new mongoose.Schema({
    admin : String,
    team_id : String
});

const Team = mongoose.model("Team", teamSchema);

// --------------------------------------------------------------------------------------------------------------

module.exports = Team;