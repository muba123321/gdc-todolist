import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/errorMiddleware.js";

// SignIn Controller
export const signIn = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) return next(errorHandler(401, "Invalid username"));

    // Validate password
    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) return next(errorHandler(401, "Invalid password"));

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Set token in HttpOnly cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    next(err);
  }
};

// Signup Controller
export const signUp = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return next(errorHandler(400, "Username already exists"));

    // Create new user
    const newUser = new User({ username, password });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    next(err);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("username");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
