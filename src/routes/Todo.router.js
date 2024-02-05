/** @format */

import express from "express";
import {
  getTodos,
  addTodo,
  deleteTodo,
} from "../controllers/Todo.controller.js";

const router = express.Router();

router.get("/get", getTodos);
router.post("/add", addTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
