"use client";

import { useTodoStore } from '@/store/todo';
import { Todo } from '@/types/todo';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

const TodoCardSingle = ({ type }: { type: string }) => {
  const [filtered, setFiltered] = useState<Todo[]>([]);
  const { setTodos } = useTodoStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!['day', 'week', 'month', 'year', 'other'].includes(type)) return;

    setTodos().then(() => {
      setLoading(false);
      const newTodos = useTodoStore.getState().todos;
      const selected = newTodos.filter(todo => todo.real === type);
      setFiltered(selected);
    });
  }, [type, setTodos]);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen w-full space-x-5'>
        <Loader2 className='animate-spin' size={50} color="#3b82f6" />
        <p className='text-gray-600 text-lg font-semibold'>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-3">
      {filtered.length === 0 && (
        <div className="p-6 text-center text-muted-foreground">No todos found.</div>
      )}
      {filtered.map(todo => (
        <Link href={`/todo/${todo.id}`} key={todo.id}>
          <div key={todo.id} className="p-4 bg-gray-100 rounded shadow-sm flex justify-between items-center">
            <div className="flex flex-col">
              <div className="font-medium">{todo.todo}</div>
              <div className="text-sm text-gray-500">
                Status: <span className={`font-semibold ${todo.status === 'waiting' ? 'text-gray-800' : todo.status === 'completed' ? 'text-green-500' : todo.status === 'active' ? 'text-yellow-500' : ''}`}>{todo.status}</span>
              </div>
            </div>

            <div className='flex space-x-2 items-center'>
              {/* --- EDIT DIALOG FORM --- */}
              <Button variant="outline" className='bg-blue-500 hover:bg-blue-500 text-white hover:text-white px-4 py-2 h-10 rounded'>Edit</Button>

              {/* --- DELETE FORM --- */}
              <button className="bg-red-500 text-white px-4 py-2 rounded ml-2 h-10">Delete</button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default TodoCardSingle
