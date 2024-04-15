const router = require("express").Router();

const {
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    viewOneCourseById,
    searchCourse
} = require('../controllers/courseController');

//create new course
router.post("/add", createCourse);

//view all courses
router.get("/", getAllCourses);

//update a course by id
router.put("/update/:id", updateCourse);

//delete course by id
router.delete("/delete/:id", deleteCourse);

//view one specific course by id
router.get("/get/:id", viewOneCourseById);

//search course
router.get("/search/:key", searchCourse);

module.exports = router;