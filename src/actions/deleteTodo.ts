"use server";

import db from "@/lib/db"
import { redirect } from "next/navigation";

export const deleteTodo = async (id: string | undefined, type: string, allId: string) => {
  if (type !== "day" && type !== "week" && type !== "month" && type !== "year") {
    throw new Error("Invalid input")
  }

  Promise.all([
    (db[type] as any).delete({
      where: {
        id
      }
    }),
    db.all.delete({
      where: {
        id: allId,
        realId: id,
        real: type
      }
    })
  ]);

  redirect(`/todos/${type}`)
}
