"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

export const editTodoStatus = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const real = formData.get("real") as string;
  const realId = formData.get("realId") as string;
  const status = formData.get("status") as string;

  if (!id || !real || !realId || !status) {
    throw new Error("Invalid input");
  }

  if (real !== "day" && real !== "week" && real !== "month" && real !== "year" && real !== "other") {
    throw new Error("Invalid type");
  }

  if (status !== "active" && status !== "completed" && status !== "waiting") {
    throw new Error("Invalid type");
  }

  let data;

  async function editTodoSingle () {
    if (real === 'day') {
      data = await db.day.update({
        where: { id: realId },
        data: { status },
      });
    } else if (real === 'week') {
      data = await db.week.update({
        where: { id: realId },
        data: { status },
      });
    } else if (real === 'month') {
      data = await db.month.update({
        where: { id: realId },
        data: { status },
      });
    } else if (real === 'year') {
      data = await db.year.update({
        where: { id: realId },
        data: { status },
      });
    } else if (real === 'other') {
      data = await db.other.update({
        where: { id: realId },
        data: { status },
      });
    }
  }

  await Promise.all([
    editTodoSingle(),
    db.all.update({
      where: { id },
      data: { status },
    }),
  ]);


  console.log("Todo updated successfully");
  console.log(data);

  // 🔥 this should NOT be in the try/catch
  redirect(`/todo/${id}`);
};
