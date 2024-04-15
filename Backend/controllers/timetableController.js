const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

require('dotenv').config();

let TimeTable = require("../models/timetable"); // Import the Time Table model
const User = require('../models/user'); // Import the User model
const Student = require('../models/student'); // Import the Student model

//create new timetable
const createTimeTable = async (req, res) => {
    const newTimeTable = new TimeTable(req.body);

    newTimeTable.save().then(() => {
        res.json("Time Table was created successfully!")
    }).catch((error) => {
        console.log(error);
    })
}

//view all timetable
const getAllTimeTables = async(req, res) => {

    TimeTable.find().then((timetables) => {
        res.json(timetables)
    }).catch((error) => {
        console.log(error);
    })
}

//update a time table by id
const updateTimeTable = async (req, res) => {
    let timetableId = req.params.id;
    const { batch, faculty, timeTableData } = req.body;

    const updateTimeTable = {
        batch,
        faculty,
        timeTableData
    }

    try {
        // Update timetable
        const update = await TimeTable.findByIdAndUpdate(timetableId, updateTimeTable);

        if (!update) {
            return res.status(404).send({ status: "Time Table not found" });
        }

        // Fetch emails of all users
        const users = await User.find({}, 'email');
        const students = await Student.find({}, 'email');
        const allEmails = [...users.map(user => user.email), ...students.map(student => student.email)];

        // Configure SMTP transport
        const transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS 
            }
        }));

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: allEmails.join(','), // Send to all emails separated by comma
            subject: 'Time Table Updated',
            text: 'The time table has been successfully updated.'
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.status(500).send({ status: "Time table updated, but notification email not sent", error: error.message });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send({ status: "Time Table successfully updated and notification email sent" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Time table update unsuccessful, try again", error: error.message });
    }
};

//delete time table by id
const deleteTimeTable = async (req, res) => {

    let timetableId = req.params.id;

    await TimeTable.findByIdAndDelete(timetableId).then(() => {
        res.status(200).send({ status: "Time Table deleted!" });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Time Table deletion unsuccessful!", error: error.message });
    })
}

//view one specific time table by id
const viewOneTimeTableById = async (req, res) => {
    let timetableId = req.params.id;

    const timetable = await TimeTable.findById(timetableId).then((timetable) => {
        res.status(200).send({ timetable });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error with fetching the time table!", error: error.message });
    })
}

//search timetable by batch
const searchTimeTable =
    async (req, resp) => {
        let result = await TimeTable.find({
            "$or": [
                {
                    batch: { $regex: req.params.key }
                }
            ]
        });
        resp.send(result);
}

module.exports = {
    createTimeTable,
    getAllTimeTables,
    updateTimeTable,
    deleteTimeTable,
    viewOneTimeTableById,
    searchTimeTable
};