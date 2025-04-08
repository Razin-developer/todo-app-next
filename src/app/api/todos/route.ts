"use server";

import { deleteData } from "@/actions/autoDelete";
import db from "@/lib/db"

export async function GET() {
  const todos = await db.all.findMany()
  return new Response(JSON.stringify(todos))
}

export async function DELETE() {
  ["day", "week", "month", "year"].forEach((type) => {
    deleteData(type as 'day' | 'week' | 'month' | 'year') 
  });
  return new Response(JSON.stringify({successfully: true}))
}
