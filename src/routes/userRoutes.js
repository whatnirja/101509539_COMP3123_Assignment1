const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

router.post('/signup', (req, res) => {
  body('username').trim().notEmpty().withMessage('Username is required');
  body('email').trim().isEmail().withMessage('Invalid email format');
  body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long');
});










module.exports = router;