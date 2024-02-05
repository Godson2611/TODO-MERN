import express from "express";
import Todo from "./Todo.router.js"

const router = express.Router();

router.use('/todos',Todo)

export default router;