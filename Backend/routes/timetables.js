const router = require("express").Router();

const {
    createTimeTable,
    getAllTimeTables,
    updateTimeTable,
    deleteTimeTable,
    viewOneTimeTableById,
    searchTimeTable
} = require('../controllers/timetableController');

//create new timetable
router.post("/add", createTimeTable);

//view all timetable
router.get("/", getAllTimeTables);

//update a time table by id
router.put("/update/:id", updateTimeTable);

//delete time table by id
router.delete("/delete/:id", deleteTimeTable);

//view one specific time table by id
router.get("/get/:id", viewOneTimeTableById);

//search timetable by batch
router.get("/search/:key", searchTimeTable);

module.exports = router;