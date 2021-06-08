const { verify } = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified:{type:Boolean,required:true, default: false},
    verification_token:{type:String, required:true}
});


module.exports = mongoose.model("Users",userSchema);