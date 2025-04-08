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

  await Promise.all([
    (db[real] as any).update({
      where: { id: realId },
      data: { status },
    }),
    db.all.update({
      where: { id },
      data: { status },
    }),
  ]);

  console.log("Todo updated successfully");

  // 🔥 this should NOT be in the try/catch
  redirect(`/todo/${id}`);
};
