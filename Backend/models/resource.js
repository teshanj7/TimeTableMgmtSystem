const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({

    resourceName : {
        type : String,
        required : true
    },

    resourceCode : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    faculty : {
        type : String,
        required : true
    },

    availablity : {
        type : Boolean,
        required : true
    }
})

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;