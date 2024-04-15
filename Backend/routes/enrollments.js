const router = require("express").Router();

const {
    createEnrollment,
    deleteEnrollment,
    updateEnrollmentStatusById
} = require('../controllers/enrollmentController');

//create new enrollment
router.post("/add", createEnrollment);

//delete enrollment by id
router.delete("/delete/:id", deleteEnrollment);

// Update enrollment status by student ID
router.put("/updateEnrollment/:id", updateEnrollmentStatusById);

module.exports = router;