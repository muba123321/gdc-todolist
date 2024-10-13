import mongoose from "mongoose";

// schema to validate our task data and determine what to store in backend
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// create our model with the schema (first parameter is collection name)
const Task = mongoose.model("tasks", taskSchema);

// need our model in our server to interact with task documents
export default Task;
