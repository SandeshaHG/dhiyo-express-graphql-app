const mongoose = require("mongoose")

var UserSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required:true
    },
    userPassword : {
        type : String,
        required : true
    }
});

module.exports=mongoose.model("users",UserSchema)