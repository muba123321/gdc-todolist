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
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// create our model with the schema (first parameter is collection name)
const User = mongoose.model("user", userSchema);

// need our model in our server to interact with user documents
export default User;
