const User = require("../models/user");
const Student = require("../models/student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Handles registering a user with the system
const registerUser = async (req, res) => {
  try {

    const { fullName, email, address, telephoneNumber, userType, userName, password } =
      req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        fullName,
        email,
        address,
        telephoneNumber,
        userType,
        userName,
        password: hashedPassword,
      });

      const token = jwt.sign({_id: newUser._id}, 'secretkey123', {
        expiresIn: '90d',
      });
      
      await newUser.save();

      res.status(200).json({ message: "User registration successful!", token });
    } else {
      res.status(403).json({ message: "User with this email already exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Handles the login of a user to the system
const loginUser = async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    if (userType == 'admin' || userType == 'faculty'){
        const user = await User.findOne({ email });

        if (!user) {
          return res.status(404).json({ error: "User not found!, try again...." });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (isPasswordValid && userType == user.userType) {
          let loginMessage;
          switch (userType) {
            case 'admin':
              loginMessage = "Successfully logged in as an Admin!";
              break;
            case 'faculty':
              loginMessage = "Successfully logged in as a Faculty!";
              break;
            default:
              loginMessage = "Unknown user type!";
              break;
          }
          const token = jwt.sign({ email: user.email }, "Your_Secret_Token", { expiresIn: '1h' });
          return res.status(200).json({ token, user, message: loginMessage });
        } else {
          return res.status(401).json({ error: "Password or User Type is incorrect!" });
        }
    }
    else if (userType == 'student'){
      const student = await Student.findOne({ email });

      if (!student) {
        return res.status(404).json({ error: "Student not found!, try again...." });
      }

      const isPasswordValid = await bcrypt.compare(password, student.password);

      if (isPasswordValid && userType == student.userType) {
        let loginMessage = 'Successfully logged in as a Student!';

        const token = jwt.sign({ email: student.email }, "Your_Secret_Token", { expiresIn: '1h' });
        return res.status(200).json({ token, student, message: loginMessage });
      } else {
        return res.status(401).json({ error: "Password or User Type is incorrect!" });
      }
    }


  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser
};