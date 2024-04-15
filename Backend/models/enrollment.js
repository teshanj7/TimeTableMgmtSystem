const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({

    studentId : {
        type: String,
        required: true
    },

    faculty : {
        type : String,
        required : true
    },

    batchName : {
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
    
    course : {
        type : String,
        required : true
    }

})

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;