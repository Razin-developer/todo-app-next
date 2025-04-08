"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

export const editTodo = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const real = formData.get("real") as string;
  const realId = formData.get("realId") as string;
  const todo = formData.get("todo") as string;

  if (!id || !real || !realId || !todo) {
    throw new Error("Invalid input");
  }

  if (todo.trim().length < 3) {
    throw new Error("Todo must be at least 3 characters long");
  }

  if (real !== "day" && real !== "week" && real !== "month" && real !== "year" && real !== "other") {
    throw new Error("Invalid type");
  }

  let data;

  async function editTodoSingle () {
    if (real === 'day') {
      data = await db.day.update({
        where: { id: realId },
        data: { todo },
      });
    } else if (real === 'week') {
      data = await db.week.update({
        where: { id: realId },
        data: { todo },
      });
    } else if (real === 'month') {
      data = await db.month.update({
        where: { id: realId },
        data: { todo },
      });
    } else if (real === 'year') {
      data = await db.year.update({
        where: { id: realId },
        data: { todo },
      });
    } else if (real === 'other') {
      data = await db.other.update({
        where: { id: realId },
        data: { todo },
      });
    }
  }

  await Promise.all([
    editTodoSingle(),
    db.all.update({
      where: { id },
      data: { todo },
    }),
  ]);

  console.log("Todo updated successfully");
  console.log(data);

  // 🔥 this should NOT be in the try/catch
  redirect(`/todo/${id}`);
};
