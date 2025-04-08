// app/page.tsx
import TodoList from '@/components/TodoCard';

export default function Page() {
  return (
    <div className="flex flex-col items-center h-screen w-full">
      <h1 className="text-3xl font-bold text-gray-800 mt-10">All Todos</h1>
      <TodoList />
    </div>
  );
}
