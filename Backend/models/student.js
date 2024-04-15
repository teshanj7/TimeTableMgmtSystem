const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({

    registerNumber : {
        type: String,
        required: true
    },

    studentName : {
        type : String,
        required : true
    },

    studentAge : {
        type : Number,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    batchName : {
        type : String,
        required : true
    },

    faculty : {
        type : String,
        required : true
    },

    specialization : {
        type : String,
        required : true
    },

    enrollmentStatus : {
        type : Boolean,
        required : true
    },

    userType : { 
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

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;