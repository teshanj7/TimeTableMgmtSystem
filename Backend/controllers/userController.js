const User = require("../models/user");
const authenticate = require('../middleware/authMiddleware');

// Handles getting all users from the database
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Handles updating a particular user
const updateUser = async (req, res) => {
  try {

    let userId = req.params.id;

    const {
      fullName,
      email,
      address,
      telephoneNumber,
      userType,
      userName,
      password,
    } = req.body;

    const updateUser = {
      fullName,
      email,
      address,
      telephoneNumber,
      userType,
      userName,
      password,
    };

    await User.findByIdAndUpdate(userId, updateUser);

    res.status(200).send({ status: "User updated" });
  } catch (error) {
    res.status(500).send({ status: "Error with updating data", error: error.message });
  }
};

// Handles deleting a particular user
const deleteUser = async (req, res) => {

  try {

    let userId = req.params.id;

    await User.findByIdAndDelete(userId);
    res.status(200).send({ status: "User deleted" });
  } catch (error) {
    res.status(500).send({ status: "Error with delete user", error: error.message });
  }

};

// Handles viewing details of a particular user
const viewUserDetails = async (req, res) => {

  try {

    let userId = req.params.id;

    const user = await User.findById(userId);
    res.status(200).send({ status: "User fetched", user });
  } catch (error) {
    res.status(500).send({ status: "Error with fetching user", error: error.message });
  }

};

// Handles searching users
const searchUsers = async (req, res) => {

  try {
    let result = await User.find({
      "$or": [
        {
          fullName: { $regex: req.params.key },
        },
        {
          userName: { $regex: req.params.key },
        },
      ],
    });
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
  
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  viewUserDetails,
  searchUsers,
};