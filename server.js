import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectdb from "./database/connectdb.js";
import authRoutes from "./src/routes/authRoutes.js"
import taskRoutes from "./src/routes/taskRoutes.js";
import errorHandler from "./src/middlewares/errorHandler.js"

dotenv.config(); // Loading .env file into the process

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // It parses incoming request with JSON payloads
app.use(cookieParser()); // It parses incoming request's cookies
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use(errorHandler);

/* 
    A server is made up of two thin gs DB + Server side logic.
    Start server if we are connected to the DB. 
*/

connectdb()
.then(() => {
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
})


