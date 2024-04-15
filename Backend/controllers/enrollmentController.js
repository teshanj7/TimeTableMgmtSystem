let Enrollment = require("../models/enrollment");

//create new enrollment
const createEnrollment = async (req, res) => {
    const { studentId, faculty, batchName, specialization, enrollmentStatus, course } = req.body;

    const newEnrollment = new Enrollment({
        studentId,
        faculty,
        batchName,
        specialization,
        enrollmentStatus, 
        course
    })

    newEnrollment.save().then(() => {
        //validations
        if (!studentId || !faculty || !batchName || !specialization || !course) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        res.json("Enrollment was done successfully!")
    }).catch((error) => {
        console.log(error);
    })
}

//delete enrollment by id
const deleteEnrollment = async (req, res) => {

    let enrollmentId = req.params.id;

    await Enrollment.findByIdAndDelete(enrollmentId).then(() => {
        res.status(200).send({ status: "Enrollment deleted!" });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Enrollment deletion unsuccessful!", error: error.message });
    })
}

// Update enrollment status by student ID
const updateEnrollmentStatusById = async (req, res) => {
    try {
        const enrollmentId = req.params.id;
        const { enrollmentStatus } = req.body;

        // Update only enrollment status
        const update = await Enrollment.findByIdAndUpdate(enrollmentId, { enrollmentStatus });

        if (!update) {
            return res.status(404).send({ status: "Enrollment info not found" });
        }

        res.status(200).send({ status: "Enrollment status successfully updated" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Failed to update enrollment status", error: error.message });
    }
};


module.exports = {
    createEnrollment,
    deleteEnrollment,
    updateEnrollmentStatusById
};