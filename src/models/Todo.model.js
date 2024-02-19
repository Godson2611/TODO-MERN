/** @format */

import mongoose from "./index.modle.js";

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    collection: "todos",
    versionKey: false,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
