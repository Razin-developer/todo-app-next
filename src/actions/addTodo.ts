"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

async function addTodoToDb(todo: string, type: 'day' | 'week' | 'month' | 'year' | 'other') {
  const data = await (db[type] as any).create({
    data: {
      todo,
      status: 'active',
    },
  });

  const allData = await db.all.create({
    data: {
      todo,
      status: 'waiting',
      realId: data.id,
      real: type,
    },
  });

  return [data, allData];
}

export default async function addTodo(formData: FormData) {
  const todo = formData.get("todo") as string;
  const type = formData.get("type") as string;

  console.log(todo, type);

  if (!todo || !type || todo.trim() === "" || type.trim() === "") {
    throw new Error("Invalid input");
  }

  if (type !== 'day' && type !== 'week' && type !== 'month' && type !== 'year' && type !== 'other') {
    throw new Error("Invalid type");
  }

  if (todo.length < 3) {
    throw new Error("Todo must be at least 3 characters long");
  }

  await addTodoToDb(todo, type);

  redirect(`/todos/${type}`);
}
