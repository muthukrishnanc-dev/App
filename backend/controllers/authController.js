const Users = require("../models/users");
const Tasks = require("../models/tasks");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("express-validator");
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: "must fill all fields" });
  }

  try {
    if (await Users.findOne({ email })) {
      res.status(400).json({ message: "User already exists" });
    }
    // hash password before store db;
    const hashpassword = await bcrypt.hash(password, 12);
    const user = await Users.create({
      username,
      email,
      password: hashpassword,
    });
    //   genarate token for authorization;
    const token = jwt.sign({ id: user._id }, process.env.Secret_key, {
      expiresIn: "7d",
    });
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    }
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.json({ error: error.message });
    // console.log(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "must fill all fields" });
  }
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "user doesn't exists create account" });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      res.status(400).json({ message: "password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, process.env.Secret_key, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await Users.findById(req.user).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
