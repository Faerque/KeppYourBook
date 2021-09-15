const express = require("express");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const usersRoute = express.Router();
const generateToken = require("../utils/generateToken");
const authMiddleware = require("../middlewares/authMiddleware");

// Register
usersRoute.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      throw new Error(" User Exists!");
    }
    const userCreated = await User.create({
      name,
      email,
      password,
    });
    res.json({
      _id: userCreated._id,
      name: userCreated.name,
      password: userCreated.password,
      email: userCreated.email,
      token: generateToken(userCreated._id),
    });
  })
);

// Login
usersRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.isPasswordMatch(password))) {
      // Set Status Code
      res.status(200);

      res.json({
        _id: user._id,
        name: user.name,
        password: user.password,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error(" Invalid Credentials ");
    }
  })
);

// Update User
usersRoute.put("/update", authMiddleware, (req, res) => {
  res.send("Update Route");
});

// Delete User
usersRoute.delete("/:id", (req, res) => {
  res.send("Delete Route");
});

// Fetch User
usersRoute.get("/", authMiddleware, (req, res) => {
  res.send(req.user);
});

module.exports = usersRoute;
