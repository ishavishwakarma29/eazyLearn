const mongoose = require('mongoose');

//mongodb-----------------------------------------------------------------------------------------------------
mongoose.connect("mongodb+srv://sam233:42119243Sam@cluster0.bgt3y.mongodb.net/userwoc", {useNewUrlParser: true});

const testqoSchema = new mongoose.Schema({
    test_id:String,
    qo : [
        {
            qno : String,
            question : String,
            options : [],
            correct : String
        }
    ]
});

const Testqo = mongoose.model("Testqo", testqoSchema);

// --------------------------------------------------------------------------------------------------------------

module.exports = Testqo;