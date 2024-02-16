/** @format */

import express from "express";
import {
  getTodos,
  addTodo,
  deleteTodo,
  completeTodo,
} from "../controllers/Todo.controller.js";

const router = express.Router();

router.get("/get", getTodos);
router.post("/add", addTodo);
router.delete("/delete/:id", deleteTodo);
router.put("/complete/:id", completeTodo);

export default router;
