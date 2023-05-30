const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    try {
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(userID).select("-password");
      next();
    } catch (err) {
      return res.status(401).send({
        success: false,
        message: "User Is Not Authorized!",
      });
    }
  } else {
    return res.status(400).send({
      success: false,
      message: "No Token Found!",
    });
  }
};
module.exports = validateToken;
