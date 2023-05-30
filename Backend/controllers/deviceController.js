const { default: mongoose } = require("mongoose");
const Device = require("../models/deviceModel");
const User = require("../models/userModel");
const deviceController = {
  postDevice: async (req, res) => {
    const { devicename, user } = req.body;

    if (!devicename) {
      res.status(400);
      throw new Error("Please Add Device Name!");
    } else {
      const device = new Device({
        devicename,
        user,
      });
      const postedDevice = await device.save();
      res.status(201).send({
        message: "New Device Added Successfully!",
        data: postedDevice,
      });
    }
  },

  getDeviceByuserId: async (req, res) => {
    const user = req.params.userid;

    const reqData = await Device.find({
      user: user,
    });
    res.status(200).send({
      message: "success",
      data: reqData,
    });
  },

  addDeviceData: async (req, res) => {
    try {
      const { DeviceID, temparature, ecg, oxygen, heartbeat } = req.body;
      const device = await Device.findById(DeviceID);
      if (device) {
        const NewData = await Device.findByIdAndUpdate(
          DeviceID,
          {
            $push: {
              temparature: { value: temparature, rec_time: new Date() },
              heartbeat: { value: heartbeat, rec_time: new Date() },
              ecg: { value: ecg, rec_time: new Date() },
              oxygen: { value: oxygen, rec_time: new Date() },
            },
          },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: "Data Added Successfully!",
          data: NewData,
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Device Not Found!",
        });
      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Server Are Busy Try Again After Some Time!",
      });
    }
  },
  getDeviceData: async (req, res) => {
    const device = req.params.deviceid;

    const reqData = await Device.findById(device);
    res.status(200).send({
      message: "success",
      data: reqData,
    });
  },
};

module.exports = deviceController;
