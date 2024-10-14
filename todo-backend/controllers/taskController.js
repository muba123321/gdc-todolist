import Task from "../models/Tasks.js";
import errorHandler from "../utils/errorMiddleware.js";

// Get task by UserID
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      userId: req.user.userId,
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
      userId: req.user.userId,
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
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      {
        new: true,
      }
    );
    if (!task)
      return next(errorHandler(404, "Task not found or access denied"));
    res.status(200).json(task);
  } catch (err) {
    next(errorHandler(400, `Error updating task, ${err.message}`));
  }
};

// Delete task created
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!task)
      return next(errorHandler(404, "Task not found or access denied"));

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};
