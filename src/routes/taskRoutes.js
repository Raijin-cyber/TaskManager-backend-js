import express from "express";
import validateToken from "../middlewares/validateToken.js";
import { createTask, getUserTasks, updateTask, deleteTask } from "../controllers/taskControllers.js";

const taskRoutes = express.Router();

taskRoutes.use(validateToken);

taskRoutes.route("/create").post(createTask)

taskRoutes.route("/get").get(getUserTasks)

taskRoutes.route("/:id")
.put(updateTask)
.delete(deleteTask);

export default taskRoutes;