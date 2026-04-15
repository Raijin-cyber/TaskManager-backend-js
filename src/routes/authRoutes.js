import express from "express";

const authRoutes = express.Router();

authRoutes.route("/register").post((req, res) => {
    res.status(201).json({message: "User created successfully"});
})

authRoutes.route("/login").post((req, res) => {
    res.status(200).json({message: "User Logged-in"});
})

authRoutes.route("/logout").post((req, res) => {
    res.status(200).json({message: "User Logged-out"});
})

authRoutes.route("/update").put((req, res) => {
    res.json({message: "User updated successfully"});
})

authRoutes.route("/delete").delete((req, res) => {
    res.json({message: "User account deleted successfully"});
})

export default authRoutes;