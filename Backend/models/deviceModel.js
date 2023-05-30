const mongoose = require("mongoose");
const User = require("./userModel");
const deviceSchema = new mongoose.Schema(
  {
    devicename: {
      type: String,
      required: [true, "name is a required field"],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    temparature: [],
    heartbeat: [],
    ecg: [],
    oxygen: [],
    
  },
  {
    timestamps: true,
  }
);
const Device = mongoose.model("Device", deviceSchema);
module.exports = Device;
