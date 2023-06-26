const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is a required field"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "First Name is a required field"],
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
