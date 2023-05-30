const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const validateToken = require("../middleware/ValidateTokenHandler");

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.post(
  "user_id/device_id/",
  validateToken,
  userController.addDeviceData
);

module.exports = userRouter;
