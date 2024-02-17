import express from "express";
import Todo from "./Todo.router.js"
import User from "./User.router.js";

const router = express.Router();

router.use("/todos", Todo);
router.use("/users", User);

export default router;