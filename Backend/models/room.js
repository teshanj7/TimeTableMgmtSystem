const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({

    roomName : {
        type : String,
        required: true
    },

    roomNumber : {
        type : String,
        required: true
    },

    location : {
        type : String,
        required: true
    },

    noOfSeats : {
        type : Number,
        required: true
    },

    availablity : {
        type : Boolean,
        required : true
    }
    
})

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;