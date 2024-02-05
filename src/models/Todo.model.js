import mongoose from './index.modles.js';

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
