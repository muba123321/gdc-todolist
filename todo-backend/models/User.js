import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// schema to validate our User data and determine what to store in backend
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//hash the password with bycrypt before storing in the database
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next(); // Only hash if password is new or modified

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
// Compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Async comparison
};

// need our model in our server to interact with user documents
export default mongoose.model("User", userSchema);
