import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js"
import taskRoutes from "./src/routes/taskRoutes.js";

dotenv.config(); // Loading .env file into the process

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // It parses incoming request with JSON payloads
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})