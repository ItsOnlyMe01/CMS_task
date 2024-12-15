const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//User Registratoon or Signup
router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { username, email, password, isAdmin } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }

  const user = await User.create({
    username,
    email,
    password,
    role: isAdmin ? "admin" : "member",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Failed to Create User");
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password, isAdmin } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const isRoleValid = await user.matchRole(isAdmin);
    const isPasswordValid = await user.matchPassword(password);

    if (!isRoleValid) {
      const error = new Error("Incorrect role Selected!");
      error.status = 401;
      throw error;
    }
    if (!isPasswordValid) {
      const error = new Error("Incorrect password!");
      error.status = 401;
      throw error;
    }

    res.json({
      _id: user._id,
      name: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message,
    });
  }
});

module.exports = router;
