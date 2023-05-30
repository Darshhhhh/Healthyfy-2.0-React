const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userController = {
  registerUser: async (req, res) => {
    const { email, password } = req.body;

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
          data: { email: userExists.email, user_id: userExists._id },
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
