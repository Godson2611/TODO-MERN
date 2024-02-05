/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import { toast } from "sonner";
import logo from "../public/vite.svg";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos/get");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error.message);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post("http://localhost:5000/todos/add", {
        description: inputValue,
      });

      setTodos((prevTodos) => [...prevTodos, response.data]);
      setInputValue("");
      toast("Todo added successfully");
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };

  return (
    <div className='flex flex-col items-center pt-10 min-h-screen bg-gray-100'>
      <div className='flex items-center mr-10'>
        <img src={logo} alt='Logo' style={{ maxWidth: '75%' }} />
        <h1 className='text-4xl font-bold'>TODO LIST</h1>
      </div>
      <form onSubmit={handleFormSubmit} className='flex mt-4'>
        <input
          type='text'
          placeholder='Enter todo description'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='mr-2 px-3 py-2 border border-gray-300 rounded-md'
        />
        <button
          type='submit'
          className='px-3 py-2 bg-blue-500 text-white rounded-md'
        >
          Add Todo
        </button>
      </form>
      <Table todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
