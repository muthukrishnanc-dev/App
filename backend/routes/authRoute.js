const express = require("express");
const router = express.Router();
const validator = require("express-validator");
const { register, login } = require("../controllers/authController");
router.post(
  "/register",
  [
    validator.body("email").isEmail().withMessage("Enter valid Email pls"),
    validator
      .body("password")
      .isLength({ min: 6 })
      .withMessage("password atleast have 6 letters"),
  ],
  register,
);
router.post(
  "/login",
  [
    validator.body("email").isEmail().withMessage("Enter valid Email pls"),
    validator
      .body("password")
      .isLength({ min: 6 })
      .withMessage("password atleast have 6 letters"),
  ],
  login,
);
module.exports = router;
