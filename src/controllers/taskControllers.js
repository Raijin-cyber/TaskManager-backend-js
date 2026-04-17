// In this file we are going to write task controllers
// Almost all methods are going to take time to complete their execution
// so we are going to apply async await that's why we'll make a utility called asyncHandler.
import Task from "../models/taskModel.js";
import asyncHandler from "../utilities/asyncHandler.js";

// @desc Create a task
// @route " POST /api/task/create"
// @access private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate, priority } = req.body;

  // Basic validation
  if (!title) {
    res.status(400)
    throw new Error("Title is required");
  }

  // Create new task
  const task = await Task.create({
    user: req.user.user_id, 
    title,
    description,
    status,
    dueDate,   // can be ISO string or Date object
    priority,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    result: task,
  });
});

// @desc Get all tasks created by user
// @route " POST /api/task/get"
// @access private
const getUserTasks = asyncHandler(async (req, res) => {
  // req.user.user_id should come from your auth middleware (decoded JWT)
  const userId = req.user.user_id;

  if (!userId) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  });
});

// @desc Update a task belonging to the logged-in user
// @route " PUT /api/task/:id"
// @access private
const updateTask = asyncHandler(async (req, res) => {
    const userId = req.user.user_id;
    const taskId = req.params.id;

    // Find task by ID and user
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    // Update fields
    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description;
    task.status = req.body.status ?? task.status;
    task.dueDate = req.body.dueDate ?? task.dueDate;
    task.priority = req.body.priority ?? task.priority;

    const updatedTask = await task.save();

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        result: updatedTask,
    });
});

// @desc delete a task belonging to the logged-in user
// @route " DELETE /api/task/:id"
// @access private
const deleteTask = asyncHandler(async (req, res) => {
    const userId = req.user.user_id;
    const taskId = req.params.id;

    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    result: {
            id: task._id,
            title: task.title,
            status: task.status,
        },
    });
});

export {
    createTask,
    getUserTasks,
    updateTask,
    deleteTask,
}