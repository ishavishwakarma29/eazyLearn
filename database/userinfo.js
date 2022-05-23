const mongoose = require('mongoose');

//mongodb-----------------------------------------------------------------------------------------------------
mongoose.connect("mongodb+srv://sam233:42119243Sam@cluster0.bgt3y.mongodb.net/userwoc", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    email: String,
    name:String,
    age: Number,
    password:String
});

const User = mongoose.model("User", userSchema);

// --------------------------------------------------------------------------------------------------------------

module.exports = User;