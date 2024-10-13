import User from "../models/User.js";
import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorMiddleware.js";

export const signIn = async (req, res, next) => {
  const { username, password } = req.body;
  //
  try {
    const user = await User.findOne({ username });
    if (!user) return next(errorHandler(401, "Invalid credentials"));

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) return next(errorHandler(401, "Invalid credentials"));
    //
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
