const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const express = require("express");
const connection = require("./config/DBConnection");
const deviceRouter = require("./routes/deviceRoutes");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/device", deviceRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Deployeddd!");
});

app.listen(PORT, () => {
  connection();
  console.log(`Server is Running on ${PORT}!`);
});
