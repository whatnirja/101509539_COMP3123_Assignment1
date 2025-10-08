const express = require('express');
const { body, oneOf } = require('express-validator');
const { signup, login } = require('../controllers/userController');

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User route is working");
});


router.post(
  "/signup",
  [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  signup
);

router.post(
  "/login",
  [
    oneOf(
      [body("username").trim().notEmpty(), body("email").isEmail()],
      "Either username or a valid email is required"
    ),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  login
);

module.exports = router;