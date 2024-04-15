let Room = require("../models/room");

//create new room
const createRoom = async (req, res) => {
    const { roomName, roomNumber, location, noOfSeats, availablity } = req.body;

    const newRoom = new Room({
        roomName,
        roomNumber,
        location,
        noOfSeats,
        availablity
    })

    newRoom.save().then(() => {
        //validations
        if (noOfSeats <= 0 || !noOfSeats === 'number') {
            return res.status(400).json({ message: 'Number of Seats must be positive and should be a number!' })
        }
        if (!roomName || !roomNumber || !location || !noOfSeats) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        res.json("Room Entity was created successfully!")
    }).catch((error) => {
        console.log(error);
    })
}

//view all rooms
const getAllCourses = async (req, res) => {

    Room.find().then((rooms) => {
        res.json(rooms)
    }).catch((error) => {
        console.log(error);
    })
}

//update a room by id
const updateRoom = async (req, res) => {
    let roomId = req.params.id;
    const { roomName, roomNumber, location, noOfSeats, availablity } = req.body;

    const updateRoom = {
        roomName,
        roomNumber,
        location,
        noOfSeats,
        availablity
    }

    const update = await Room.findByIdAndUpdate(roomId, updateRoom).then(() => {
        res.status(200).send({ status: "Room Entity successfully updated!" })
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Room update unsuccessful, try again", error: error.message });
    })
}

//delete room by id
const deleteRoom = async (req, res) => {

    let roomId = req.params.id;

    await Room.findByIdAndDelete(roomId).then(() => {
        res.status(200).send({ status: "Room deleted!" });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Room deletion unsuccessful!", error: error.message });
    })
}

//view one specific room by id
const viewOneRoomById = async (req, res) => {
    let roomId = req.params.id;

    const room = await Room.findById(roomId).then((room) => {
        res.status(200).send({ room });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error with fetching the room!", error: error.message });
    })
}

//search room
const searchRoom =
    async (req, resp) => {
        let result = await Room.find({
            "$or": [
                {
                    roomName: { $regex: req.params.key }
                },
                {
                    roomNumber: { $regex: req.params.key }
                }
            ]
        });
        resp.send(result);
}

module.exports = {
    createRoom,
    getAllCourses,
    updateRoom,
    deleteRoom,
    viewOneRoomById,
    searchRoom
};