"use client";

import addTodo from '@/actions/addTodo'
import TodoList from '@/components/TodoCard';
import { useTodoStore } from '@/store/todo';
import React, { useEffect } from 'react'

const page = () => {
  const { autoDelete, setTodos } = useTodoStore();
  const [formData, setFormData] = React.useState({ todo: "", type: "" });
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false)

  useEffect(() => {
    autoDelete();
    setTodos();
  }, []);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.value.trim() === "") {
      setError("Please fill out this field.");
    } else if (e.target.value.length < 3) {
      setError("Todo must be at least 3 characters long.");
    } else {
      setError(null);
    }
  }

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.value === "") {
      setError("Please select a type.");
    } else {
      setError(null);
    }
  }

  const addTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setPending(true)
    e.preventDefault();
    if (formData.todo.trim() === "" || formData.type === "") {
      setError("Please fill out all fields.");
      return;
    }

    if (formData.todo.length < 3) {
      setError("Todo must be at least 3 characters long.");
      return;
    }
    if (formData.type !== "day" && formData.type !== "week" && formData.type !== "month" && formData.type !== "year" && formData.type !== "other") {
      setError("Invalid type selected.");
      return;
    }
    if (error) {
      return;
    }
    try {
      await addTodo(new FormData(e.currentTarget));
    } catch (err) {
      setError("Failed to add todo. Please try again.");
    } finally {
      setPending(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center space-y-12 overflow-y-auto min-h-1/2-screen w-full'>
      <h1 className='text-3xl font-bold text-gray-800 mt-8'>Welcome to the To Do App</h1>
      <div className='flex flex-col items-center justify-center mt-10'>
        <h2 className='text-2xl font-semibold text-gray-700'>Add a New Task</h2>
        <p className='text-gray-600'>Enter the task you want to add below:</p>
        <form onSubmit={addTodoHandler} className='flex flex-col items-center justify-between w-full max-w-lg mt-4 space-y-2'>
          <input name='todo' type="text" placeholder='Enter your task' className='border-2 border-gray-300 rounded-lg p-2 w-full' onChange={inputChange} />
          <select name='type' className='border-2 border-gray-300 rounded-lg p-2 w-full' onChange={selectChange} children={
            <>
              <option value="">Choose A Option</option>
              <option value="day">Day Task</option>
              <option value="week">Week Task</option>
              <option value="month">Month Task</option>
              <option value="year">Year Task</option>
              <option value="other">Other Task</option>
            </>
          } />
          <button type="submit" className='bg-blue-500 text-white rounded-lg p-2 w-full'>{pending ? "...Adding" : "Add Todo"}</button>
        </form>
        {error &&
          <div className='mt-4 p-2 bg-red-100 text-red-700 rounded-lg'>
            <strong>Error:</strong> {error}
          </div>
        }
      </div>
      <div className="flex flex-col items-center h-full w-full mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mt-10">All Todos</h1>
        <TodoList />
      </div>
    </div>
  )
}

export default page
