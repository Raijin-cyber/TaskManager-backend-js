import express from "express";

const taskRoutes = express.Router();

taskRoutes.route("/create").post((req, res) => {
  res.send("Task created successfully");  
})

taskRoutes.route("/tasks").get((req, res) => {
  res.send("Fetched all tasks successfully");  
})

taskRoutes.route("/update").post((req, res) => {
  res.send("Updated task successfully");  
})

taskRoutes.route("/delete").post((req, res) => {
  res.send("Task deleted successfully");  
})

export default taskRoutes;