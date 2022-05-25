const mongoose = require('mongoose');

//mongodb-----------------------------------------------------------------------------------------------------
mongoose.connect("mongodb+srv://sam233:42119243Sam@cluster0.bgt3y.mongodb.net/userwoc", {useNewUrlParser: true});

const userteamSchema = new mongoose.Schema({
    user : String,
    team_id : String
});

const Userteam = mongoose.model("Userteam", userteamSchema);

// --------------------------------------------------------------------------------------------------------------

module.exports = Userteam;