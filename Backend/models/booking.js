const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    date : {
        type: Date,
        required: true
    },

    timeDuration : {
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

    batchName : {
        type : String,
        required : true
    },

    bookingEntity : {
        type : String,
        required : true
    }
})

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;