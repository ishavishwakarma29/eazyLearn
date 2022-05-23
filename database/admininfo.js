const mongoose = require('mongoose');

//mongodb-----------------------------------------------------------------------------------------------------
mongoose.connect("mongodb+srv://sam233:42119243Sam@cluster0.bgt3y.mongodb.net/userwoc", {useNewUrlParser: true});

const adminSchema = new mongoose.Schema({
    email: String,
    name:String,
    subject : String,
    organisation : String,
    contactNo : String,
    password:String
});

const Admin = mongoose.model("Admin", adminSchema);

// --------------------------------------------------------------------------------------------------------------

module.exports = Admin;