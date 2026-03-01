const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));

app.use("/auth", require("./routes/authRoute"));
app.use("/manager", require("./routes/userRoute"));
app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
