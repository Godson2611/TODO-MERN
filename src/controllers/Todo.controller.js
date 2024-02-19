import Todo from '../models/Todo.model.js';

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTodo = async (req, res) => {
  const { description } = req.body;

  const newTodo = new Todo({
    description,
  });

  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const undoCompleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { completed: false },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};