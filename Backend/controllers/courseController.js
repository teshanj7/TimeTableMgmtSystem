let Course = require("../models/course");

//create new course
const createCourse = async(req, res) => {
    const { courseName, courseCode, description, noOfCredits } = req.body;

    const newCourse = new Course({
        courseName,
        courseCode,
        description,
        noOfCredits
    })

    newCourse.save().then(() => {
        //validations
        if (noOfCredits <= 0 || !noOfCredits === 'number') {
            return res.status(400).json({ message: 'Number of Credits must be positive and should be a number!' })
        }
        if (!courseName || !courseCode || !description || !noOfCredits) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        res.json("Course was created successfully!")
    }).catch((error) => {
        console.log(error);
    })
}

//view all courses
const getAllCourses = async(req, res) => {

    Course.find().then((courses) => {
        res.json(courses)
    }).catch((error) => {
        console.log(error);
    })
}

//update a course by id
const updateCourse = async (req, res) => {
    let courseId = req.params.id;
    const { courseName, courseCode, description, noOfCredits } = req.body;

    const updateCourse = {
        courseName,
        courseCode,
        description,
        noOfCredits
    }

    const update = await Course.findByIdAndUpdate(courseId, updateCourse).then(() => {
        res.status(200).send({ status: "Course successfully updated!" })
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Course update unsuccessful, try again", error: error.message });
    })
}

//delete course by id
const deleteCourse = async (req, res) => {

    let courseId = req.params.id;

    await Course.findByIdAndDelete(courseId).then(() => {
        res.status(200).send({ status: "Course deleted!" });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Course deletion unsuccessful!", error: error.message });
    })
}

//view one specific course by id
const viewOneCourseById = async (req, res) => {
    let courseId = req.params.id;

    const course = await Course.findById(courseId).then((course) => {
        res.status(200).send({ course });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error with fetching the course!", error: error.message });
    })
}

//search course
const searchCourse =
    async (req, resp) => {
        let result = await Course.find({
            "$or": [
                {
                    courseName: { $regex: req.params.key }
                },
                {
                    courseCode: { $regex: req.params.key }
                }
            ]
        });
        resp.send(result);
}

module.exports = {
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    viewOneCourseById,
    searchCourse
};