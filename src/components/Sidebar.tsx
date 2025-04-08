"use client";

import { useTodoStore } from '@/store/todo';
import Link from 'next/link'
import React from 'react'

const colors = ["#e34242", "#52df57", "#4754e4", "#f2ff3f", "#ff553f"];

const Sidebar = () => {
  const { todos } = useTodoStore();

  return (
    <div>
      <div className="flex flex-col space-y-3 overflow-y-auto" style={{ scrollbarWidth: "none"}}>
        <div className="space-y-2">
          <div className="flex items-center justify-center h-16 text-gray-800 text-xl font-bold ">
            To Do App
          </div>
          <div className="flex flex-col p-4 space-y-3">
            <Link href="/" className="text-black hover:text-gray-900 font-medium border-l-4 bg-[#fff] hover:bg-gray-300 flex items-center justify-center h-12 rounded-lg text-lg border-[#e34242] hover:border-l-[2rem] transition-all duration-300 hover:rounded-2xl">Home</Link>
            <Link href="/todos" className="text-black hover:text-gray-900 font-medium border-l-4 bg-[#fff] hover:bg-gray-300 flex items-center justify-center h-12 rounded-lg text-lg border-[#e37242] hover:border-l-[2rem] transition-all duration-300 hover:rounded-2xl">All</Link>
            <Link href="/todos/day" className="text-black hover:text-gray-900 font-medium border-l-4 bg-[#fff] hover:bg-gray-300 flex items-center justify-center h-12 rounded-lg text-lg border-[#52df57] hover:border-l-[2rem] transition-all duration-300 hover:rounded-2xl">Day</Link>
            <Link href="/todos/week" className="text-black hover:text-gray-900 font-medium border-l-4 bg-[#fff] hover:bg-gray-300 flex items-center justify-center h-12 rounded-lg text-lg border-[#4754e4] hover:border-l-[2rem] transition-all duration-300 hover:rounded-2xl">Week</Link>
            <Link href="/todos/month" className="text-black hover:text-gray-900 font-medium border-l-4 bg-[#fff] hover:bg-gray-300 flex items-center justify-center h-12 rounded-lg text-lg border-[#f2ff3f] hover:border-l-[2rem] transition-all duration-300 hover:rounded-2xl">Month</Link>
            <Link href="/todos/year" className="text-black hover:text-gray-900 font-medium border-l-4 bg-[#fff] hover:bg-gray-300 flex items-center justify-center h-12 rounded-lg text-lg border-[#ff553f] hover:border-l-[2rem] transition-all duration-300 hover:rounded-2xl">Year</Link>
            <Link href="/todos/other" className="text-black hover:text-gray-900 font-medium border-l-4 bg-[#fff] hover:bg-gray-300 flex items-center justify-center h-12 rounded-lg text-lg border-[#dc3fff] hover:border-l-[2rem] transition-all duration-300 hover:rounded-2xl">Others</Link>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-center h-16 text-gray-800 text-xl font-bold">
            Add More
          </div>
          <div className="flex flex-col p-4">
            <Link href="/add" className="text-black hover:text-gray-900 font-medium border-l-4 bg-[#fff] hover:bg-gray-300 flex items-center justify-center h-12 rounded-lg text-lg border-[#52df57] hover:border-l-[2rem] transition-all duration-300 hover:rounded-2xl">Add</Link>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-center h-16 text-gray-800 text-xl font-bold">
            Recent Todo
          </div>
          <div className="flex flex-col p-4 space-y-3">
            {todos.length === 0 ? (
              <div className="text-center text-gray-500">No recent todos</div>
            ) : null}
            {todos.slice(-5).reverse().map((todo, index) => (
              <Link href={`/todo/${todo.id}`} key={todo.id} className={`text-black hover:text-gray-900 font-medium border-l-4 bg-[#fff] hover:bg-gray-300 flex items-center justify-center h-12 rounded-lg text-lg border-[${colors[index]}] hover:border-l-[2rem] transition-all duration-300 hover:rounded-2xl`}>{todo.todo}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
