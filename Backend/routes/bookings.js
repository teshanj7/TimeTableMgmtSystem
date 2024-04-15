const router = require("express").Router();

const {
    createBooking,
    getAllBookings,
    updateBooking,
    deleteBooking,
    viewOneBookingById,
    searchBooking
} = require('../controllers/bookingController');

//create new booking
router.post("/add", createBooking);

//view all bookings
router.get("/", getAllBookings);

//update a booking by id
router.put("/update/:id", updateBooking);

//delete booking by id
router.delete("/delete/:id", deleteBooking);

//view one specific booking by id
router.get("/get/:id", viewOneBookingById);

//search room
router.get("/search/:key", searchBooking);

module.exports = router;