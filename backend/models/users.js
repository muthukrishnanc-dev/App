const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username must provided"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email must provided"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password must provided"],
      unique: true,
    },
  },
  { timestamps: true },
);

const Users = new mongoose.model("users", userSchema);
module.exports = Users;
