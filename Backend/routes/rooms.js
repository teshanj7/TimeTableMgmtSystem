const router = require("express").Router();

const {
    createRoom,
    getAllCourses,
    updateRoom,
    deleteRoom,
    viewOneRoomById,
    searchRoom
} = require('../controllers/roomController');

//create new room
router.post("/add", createRoom);

//view all rooms
router.get("/", getAllCourses);

//update a room by id
router.put("/update/:id", updateRoom);

//delete room by id
router.delete("/delete/:id", deleteRoom);

//view one specific room by id
router.get("/get/:id", viewOneRoomById);

//search room
router.get("/search/:key", searchRoom);


module.exports = router;