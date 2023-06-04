const express = require("express");
const deviceRouter = express.Router();
const deviceController = require("../controllers/deviceController");
const validateToken = require("../middleware/ValidateTokenHandler");

deviceRouter.post("/create", validateToken, deviceController.postDevice);
deviceRouter.get("/:userid", validateToken, deviceController.getDeviceByuserId);

deviceRouter.post("/addData", validateToken, deviceController.addDeviceData);
deviceRouter.get(
  "/getData/:deviceid",
  validateToken,
  deviceController.getDeviceData
);

deviceRouter.post(
  "/activedeactivedevice",
  validateToken,
  deviceController.activeDeactiveDevice
);

module.exports = deviceRouter;
