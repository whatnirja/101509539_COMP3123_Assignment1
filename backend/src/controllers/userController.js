const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = require("../utils/generateToken");

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, message: "Validation error", errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;
    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return res.status(409).json({ status: false, message: "Username or email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const doc = await User.create({ username, email, password: hash });

    return res.status(201).json({
      message: "User created successfully.",
      user_id: doc._id.toString(),
    });
  } catch (e) {
    console.error("signup error:", e);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.login = async (req, res) => {
  console.log("[REQ] Login hit:", req.body);
  return res.json(
    { 
      message: "Login endpoint reached" ,
      token: generateToken(User._id),
    });
};


exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, message: "Validation error", errors: errors.array() });
  }

  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) return res.status(401).json({ status: false, message: "Invalid Username and password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ status: false, message: "Invalid Username and password" });

    //json web token
    const token = jwt.sign(
      {
        sub: user._id.toString(),
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({ message: "Login successful.", jwt_token: token });
  } catch (e) {
    console.error("login error:", e);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};
