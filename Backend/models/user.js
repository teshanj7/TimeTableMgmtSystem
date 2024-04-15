const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    fullName : {
        type : String,
        required : true
    },

    email : {
        type : String,
        unique : true,
        required : true
    },

    address : {
        type : String,
        required : true
    },

    telephoneNumber : {
        type : Number,
        required : true
    },

    userType : { // can be admin, faculty
        type : String,
        required : true
    },

    userName : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    }
 
 })
 
 const User = mongoose.model("User", userSchema);

 module.exports = User;