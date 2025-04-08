'use client';

import { Progress } from '@/components/ui/progress';
import { useTodoStore } from '@/store/todo';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';

const TodoList = () => {
  const { setTodos, todos } = useTodoStore();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTodos().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className='flex items-center justify-center h-screen w-full space-x-5'>
      <Loader2 className='animate-spin' size={50} color="#3b82f6" />
      <p className='text-gray-600 text-lg font-semibold'>Loading...</p>
    </div>
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="grid grid-cols-3 mt-10 gap-4 w-full">
      {todos.length === 0 && (
        <div className="p-6 text-center text-muted-foreground">No todos found.</div>
      )}
        {todos.map((todo) => (
          <Link href={`/todo/${todo.id}`} key={todo.id}>
            <div
              key={todo.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col space-y-4 items-center justify-center w-full"
            >
              <div className="flex items-center justify-between w-full">
                <h2 className="text-[19px] font-semibold">{todo.todo}</h2>
                <p className="text-gray-600">
                  Status:{' '}
                  <span
                    className={`font-semibold ${todo.status === 'waiting'
                        ? 'text-gray-800'
                        : todo.status === 'completed'
                          ? 'text-green-500'
                          : todo.status === 'active'
                            ? 'text-yellow-500'
                            : ''
                      }`}
                  >
                    {todo.status}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between w-full">
                <Progress
                  value={
                    todo.status === 'waiting'
                      ? 33
                      : todo.status === 'active'
                        ? 66
                        : todo.status === 'completed'
                          ? 100
                          : 0
                  }
                  className=""
                  barColor={
                    todo.status === 'waiting'
                      ? 'bg-gray-700'
                      : todo.status === 'completed'
                        ? 'bg-green-500'
                        : todo.status === 'active'
                          ? 'bg-yellow-200'
                          : 'bg-primary'
                  }
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
