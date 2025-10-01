const express = require('express');
const { body , oneOf } = require('express-validator');
const { signup , login } = require('../controllers/userController');

const router = express.Router();

router.post(
  '/signup', 
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('username').notEmpty().withMessage('Username is required')
  ], 
  signup
);


router.post(
  '/login', 
  [
    oneOf([
      body('email').isEmail().withMessage('Invalid email format'),
      body('username').notEmpty().withMessage('Username is required')
    ]),
    body('password').notEmpty().withMessage('Password is required')
  ], 
  login
);

router.get('/', (_req, res) => { 
  res.send('User route');
});

module.exports = router;