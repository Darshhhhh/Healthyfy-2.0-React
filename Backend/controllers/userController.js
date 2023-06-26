const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userController = {
  registerUser: async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(400).send({
        success: false,
        message: "User alreay exists!",
      });
    } else {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
      });
      if (newUser) {
        return res.status(201).send({
          success: true,
          message: "User Registration Successfull!",
          data: newUser,
        });
      } else {
        return res.status(500).send({
          success: false,
          message: "Error occured while registering a user!",
        });
      }
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const userExists = await User.findOne({ email: email });
      if (!userExists) {
        return res.status(400).send({
          success: false,
          message: "Invalid credentials!", // wrong email
        });
      }

      const isMatched = await bcrypt.compare(password, userExists.password);

      if (isMatched) {
        const token = jwt.sign(
          { userID: userExists._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "2d" }
        );
        return res.status(200).send({
          success: true,
          message: "Login Successful!",
          data: {
            email: userExists.email,
            user_id: userExists._id,
            firstName: userExists.firstName,
            lastName: userExists.lastName,
          },
          token: token,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "Invalid credentials!", // wrong password
        });
      }
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Unable to login. Please try after some time!",
      });
    }
  },
  userData: async (req, res) => {
    const userID = req.params.userid;
    const reqData = await User.findById(userID);
    res.status(200).send({
      message: "success",
      data: reqData,
    });
  },
  updateUserData: async (req, res) => {
    try {
      const { firstName, lastName, user_id } = req.body;
      if (!user_id) {
        res.status(400);
        throw new Error("User Id Missing!");
      } else {
        const UpdateUserData = await User.findByIdAndUpdate(
          { _id: user_id },
          { firstName: firstName },
          { lastName: lastName },
          { new: true }
        );
        if (UpdateUserData) {
          const UpdatedUser = await User.findById(user_id);
          return res.status(200).send({
            success: true,
            message: "Profile Updated successfully!",
            data: UpdatedUser,
          });
        } else {
          return res.status(400).send({
            success: false,
            message: "Error! Can't Update Profile. Try Again!",
          });
        }
      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Servers Are Busy Try Again After Some Time!",
      });
    }
  },

  addDeviceData: async (req, res) => {
    try {
      const { user_id, device_id, heartbeat, temperature, Oxygen, ecg } =
        req.body;
      if (!user_id) {
        res.status(400);
        throw new Error("User Id Missing!");
      } else if (!device_id) {
        res.status(400);
        throw new Error("Device Id Missing!");
      } else {
        const deviceData = [];
      }
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Server is Busy Try Again!",
      });
    }
  },
};

module.exports = userController;
