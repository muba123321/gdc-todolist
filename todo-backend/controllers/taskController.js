import Task from "../models/Tasks.js";
import errorHandler from "../utils/errorMiddleware.js";

// Get task by UserID
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      userId: req.user._id,
    });
    if (!tasks) return next(errorHandler(404, "No tasks found"));
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// Create task and save based on userID
export const createTask = async (req, res, next) => {
  try {
    const task = new Task({
      ...req.body,
      userId: req.user._id,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    next(errorHandler(400, `Error creating task, ${err.message}`));
  }
};

// Upate task created
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return next(errorHandler(404, "Task not found"));
    res.status(200).json(task);
  } catch (err) {
    next(errorHandler(400, `Error updating task, ${err.message}`));
  }
};

// Delete task created
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return next(errorHandler(404, "Task not found"));

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};
