const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const usersController = {
  // Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      res.status(400);
      throw new Error("User with this email or username already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  // Login
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Invalid login credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid login credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login Success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),

  // Reset Password
  resetPassword: asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token) {
      res.status(400);
      throw new Error("Reset token is required");
    }

    if (!newPassword) {
      res.status(400);
      throw new Error("New password is required");
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      res.status(400);
      throw new Error("Invalid or expired reset token");
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      message: "Password reset successfully",
    });
  }),

  // Profile
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      id: user._id,
    });
  }),

  // Change password
  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;

    if (!newPassword) {
      res.status(400);
      throw new Error("New password is required");
    }

    const user = await User.findById(req.user);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      message: "Password changed successfully",
    });
  }),

  // Update profile
  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;

    if (!email || !username) {
      res.status(400);
      throw new Error("Email and username are required");
    }

    const user = await User.findById(req.user);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const existingUser = await User.findOne({
      _id: { $ne: req.user },
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      res.status(400);
      throw new Error("Email or username is already in use");
    }

    user.email = email;
    user.username = username;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User profile updated successfully",
      updatedUser: {
        id: updatedUser._id,
        email: updatedUser.email,
        username: updatedUser.username,
      },
    });
  }),
};

module.exports = usersController;