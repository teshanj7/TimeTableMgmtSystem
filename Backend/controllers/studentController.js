let Student = require("../models/student");
const bcrypt = require("bcrypt");

//create new student
const createStudent = async (req, res) => {
    const { registerNumber, studentName, studentAge, email, batchName,
         faculty, specialization, enrollmentStatus, userType, userName, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 12);

    const newStudent = new Student({
        registerNumber,
        studentName,
        studentAge,
        email,
        batchName,
        faculty,
        specialization,
        enrollmentStatus,
        userType,
        userName,
        password: hashedPassword
    })

    newStudent.save().then(() => {
        //validations
        if (studentAge <= 0 || !studentAge === 'number') {
            return res.status(400).json({ message: 'Student Age must be positive and should be a number!' })
        }
        if (!registerNumber || !studentName || !studentAge || !email || !batchName || !faculty || 
                !specialization || !userName || !password) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        res.json("Student Account was created successfully!")
    }).catch((error) => {
        console.log(error);
    })
}

//view all students
const getAllStudents = async(req, res) => {

    Student.find().then((students) => {
        res.json(students)
    }).catch((error) => {
        console.log(error);
    })
}

//update a student by id
const updateStudent = async (req, res) => {
    let studentId = req.params.id;
    const { registerNumber, studentName, studentAge, email, batchName,
        faculty, specialization, enrollmentStatus, userType, userName, password } = req.body;

    const updateStudent = {
        registerNumber,
        studentName,
        studentAge,
        email,
        batchName,
        faculty,
        specialization,
        enrollmentStatus,
        userType,
        userName,
        password
    }

    const update = await Student.findByIdAndUpdate(studentId, updateStudent).then(() => {
        res.status(200).send({ status: "Student Info successfully updated!" })
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Student Info update unsuccessful, try again", error: error.message });
    })
}

//delete student by id
const deleteStudent = async (req, res) => {

    let studentId = req.params.id;

    await Student.findByIdAndDelete(studentId).then(() => {
        res.status(200).send({ status: "Student deleted!" });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Student deletion unsuccessful!", error: error.message });
    })
}

//view one specific student by id
const viewOneStudentById = async (req, res) => {
    let studentId = req.params.id;

    const student = await Student.findById(studentId).then((student) => {
        res.status(200).send({ student });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error with fetching the student info!", error: error.message });
    })
}

//search student
const searchStudent = 
    async (req, resp) => {
        let result = await Student.find({
            "$or": [
                {
                    registerNumber: { $regex: req.params.key }
                },
                {
                    studentName: { $regex: req.params.key }
                },
                {
                    specialization: { $regex: req.params.key }
                }
            ]
        });
        resp.send(result);
}

// Update enrollment status by student ID
const updateStudentEnrollmentStatusById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const { enrollmentStatus } = req.body;

        // Update only enrollment status
        const update = await Student.findByIdAndUpdate(studentId, { enrollmentStatus });

        if (!update) {
            return res.status(404).send({ status: "Student not found" });
        }

        res.status(200).send({ status: "Enrollment status successfully updated" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Failed to update enrollment status", error: error.message });
    }
};


module.exports = {
    createStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
    viewOneStudentById,
    searchStudent,
    updateStudentEnrollmentStatusById
};