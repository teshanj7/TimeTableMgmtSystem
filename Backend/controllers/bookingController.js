let Booking = require("../models/booking");

//create new booking
const createBooking = async(req, res) => {
    const { date, timeDuration, description, faculty, batchName, bookingEntity } = req.body;

    //validate the date
    const currentDate = new Date();
    const appointmentDate = new Date(date);

    if (appointmentDate < currentDate) {
        return res.status(400).json({ message: 'Invalid, Booking date must be in the future!' });
    }

    const newBooking = new Booking({
        date,
        timeDuration,
        description,
        faculty,
        batchName,
        bookingEntity
    })

    newBooking.save().then(() => {
        //validations
        if (!date || !timeDuration || !description || !faculty || !batchName || !bookingEntity) {
            return res.status(400).json({ message: 'All booking fields are required!' })
        }
        res.json("Booking was created successfully!")
    }).catch((error) => {
        console.log(error);
    })
}

//view all bookings
const getAllBookings = async(req, res) => {

    Booking.find().then((bookings) => {
        res.json(bookings)
    }).catch((error) => {
        console.log(error);
    })
}

//update a booking by id
const updateBooking = async (req, res) => {
    let bookingId = req.params.id;
    const { date, timeDuration, description, faculty, batchName, bookingEntity } = req.body;

    const updateBooking = {
        date,
        timeDuration,
        description,
        faculty,
        batchName,
        bookingEntity
    }

    const update = await Booking.findByIdAndUpdate(bookingId, updateBooking).then(() => {
        res.status(200).send({ status: "The Booking was successfully updated!" })
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Booking update unsuccessful, try again...", error: error.message });
    })
}

//delete booking by id
const deleteBooking = async (req, res) => {

    let bookingId = req.params.id;

    await Booking.findByIdAndDelete(bookingId).then(() => {
        res.status(200).send({ status: "Booking deleted!" });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Booking deletion unsuccessful!", error: error.message });
    })
}

//view one specific booking by id
const viewOneBookingById = async (req, res) => {
    let bookingId = req.params.id;

    const booking = await Booking.findById(bookingId).then((booking) => {
        res.status(200).send({ booking });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error with fetching the Booking!, try again later...", error: error.message });
    })
}

//search room
const searchBooking =
    async (req, resp) => {
        let result = await Booking.find({
            "$or": [
                {
                    batchName: { $regex: req.params.key }
                },
                {
                    faculty: { $regex: req.params.key }
                }
            ]
        });
        resp.send(result);
}

module.exports = {
    createBooking,
    getAllBookings,
    updateBooking,
    deleteBooking,
    viewOneBookingById,
    searchBooking
};