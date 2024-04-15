const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new mongoose.Schema({
    
    date: {
        type : Date,
        required : true
    },

    timeDuration: {
        type: String, 
        required: true 
    },

    course: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    }
  });

const timeTableSchema = new Schema({

    batch: {
        type : String,
        required : true
    },

    faculty :{
        type : String,
        required : true
    },

    timeTableData: {
        type : [[dataSchema]],
        required : true
    }
    
})

const TimeTable = mongoose.model("TimeTable", timeTableSchema);

module.exports = TimeTable;
