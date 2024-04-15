const router = require("express").Router();

const {
    createStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
    viewOneStudentById,
    searchStudent,
    updateStudentEnrollmentStatusById
} = require('../controllers/studentController');

//create new student
router.post("/add", createStudent);

//view all students
router.get("/", getAllStudents);

//update a student by id
router.put("/update/:id", updateStudent);

//delete student by id
router.delete("/delete/:id", deleteStudent);

//view one specific student by id
router.get("/get/:id", viewOneStudentById);

//search student
router.get("/search/:key", searchStudent);

// Update enrollment status by student ID
router.put("/updateEnrollment/:id", updateStudentEnrollmentStatusById);

module.exports = router;