"use server";

import db from "@/lib/db"
import { redirect } from "next/navigation";

export const deleteTodo = async (id: string | undefined, type: string, allId: string) => {
  if (type !== "day" && type !== "week" && type !== "month" && type !== "year") {
    throw new Error("Invalid input")
  }

  let data;

  async function deleteTodoFromSingle() {
    if (type === 'day') {
      data = await db.day.delete({
        where: {
          id
        }
      });
    } else if (type === 'week') {
      data = await db.week.delete({
        where: {
          id
        }
      });
    } else if (type === 'month') {
      data = await db.month.delete({
        where: {
          id
        }
      });
    } else if (type === 'year') {
      data = await db.year.delete({
        where: {
          id
        }
      });
    } else if (type === 'other') {
      data = await db.other.delete({
        where: {
          id
        }
      });
    }
  }
  Promise.all([
    deleteTodoFromSingle(),
    db.all.delete({
      where: {
        id: allId,
        realId: id,
        real: type
      }
    })
  ]);

  console.log(data);
  
  redirect(`/todos/${type}`)
}
