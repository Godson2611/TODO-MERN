import React from "react";
import TodoRow from "./TodoRow";

const Table = ({ todos, setTodos }) => {
  const handleDelete = (deletedTodoId) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo._id !== deletedTodoId)
    );
  };

  return (
    <div className='w-full max-w-md mx-auto overflow-y-auto max-h-96'>
      <table className='w-full divide-y divide-gray-200'>
        <thead>
          <tr>
            <th className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ID</th>
            <th className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Description</th>
            <th className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(todos) &&
            todos.map((todo, index) => (
              <TodoRow
                key={todo._id}
                todo={todo}
                index={index}
                onDelete={() => handleDelete(todo._id)}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
