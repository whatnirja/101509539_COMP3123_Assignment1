const express = require('express');
const { body, oneOf } = require('express-validator');
const { signup, login } = require('../controllers/userController');

const router = express.Router();

router.post(
  '/signup',
  (req, res) => {
    body('username').trim().notEmpty().withMessage('Username is required');
    body('email').trim().isEmail().withMessage('Invalid email format');
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long');
  },
  signup
);

router.post(
  '/login',
  [
    oneOf([
      body('username').trim().notEmpty(),
      body('email').trim().isEmail()
    ], 'Either username or a valid email is required'),

    body('password').trim().notEmpty().withMessage('Password is required')
  ]
  , login
);

router.get("/", (req, res) => {
  res.send("User route is working");
});

module.exports = router;