const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const authenticate = require("./middleware/authMiddleware.js");

const PORT = process.env.PORT || 8070;

// app middlewares
app.use(cors());
app.use(bodyParser.json());

//database connection
const URL = process.env.MONGODB_URL;

const connection = mongoose.connection;

mongoose.connect(URL, {});

connection.once("open", () => {
    console.log("MongoDB Connection Success!");
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
})

//implementation of the routes

//course management
const courseRouter = require("./routes/courses.js");
app.use("/course", authenticate, courseRouter);

//user management
const userRouter = require("./routes/users.js");
app.use("/user", authenticate, userRouter);

const authRouter = require('./routes/authRoutes.js');
app.use("/auth", authRouter);

//time table management
const timetableRouter = require('./routes/timetables.js');
app.use("/timetable", authenticate, timetableRouter);

//room and resource management
const roomRouter = require('./routes/rooms.js');
app.use("/room", authenticate, roomRouter);

const resourceRouter = require('./routes/resources.js');
app.use("/resource", authenticate, resourceRouter);

const bookingRouter = require('./routes/bookings.js');
app.use("/booking", authenticate, bookingRouter);

//student and enrollment management
const studentRouter = require('./routes/students.js');
app.use("/student", authenticate, studentRouter);

const enrollmentRouter = require('./routes/enrollments.js');
app.use("/enrollment", authenticate, enrollmentRouter);

module.exports = app;