import React from "react";
import axios from "axios";
import { toast } from "sonner";

const TodoRow = ({ todo, index, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://todo-mern-d1he.onrender.com/todos/delete/${todo._id}`);
      onDelete();
      toast('Todo deleted successfully');
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  return (
    <tr className="bg-white">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{todo.description}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button onClick={handleDelete} className="text-red-600 hover:text-red-900">Delete</button>
      </td>
    </tr>
  );
};

export default TodoRow;
