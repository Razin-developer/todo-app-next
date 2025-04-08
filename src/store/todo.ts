import { create } from "zustand"
import { todoStore } from "@/types/todo";
import { axiosInstance } from "@/lib/axiosInstance";
import toast from "react-hot-toast";

export const useTodoStore = create<todoStore>((set) => ({
  todos: [],
  isSettingTodo: false,
  isAddingTodo: false,
  isUpdatingTodo: false,
  isDeletingTodo: false,

  setTodos: async () => {
    set({ isSettingTodo: true })
    try {
      const res = await axiosInstance.get("/api/todos")
      set({ todos: res.data })
      console.log("Todos fetched successfully", res.data)
      toast.success("Todos fetched successfully")
      return new Promise((resolve) => {
        resolve()
      })
    } catch (error) {
      toast.error("Error fetching todos")
      console.error("Error fetching todos", error)
    } finally {
      set({ isSettingTodo: true })
    }
  },
  setAddingTodo: (isAddingTodo: boolean) => set({ isAddingTodo }),
  setUpdatingTodo: (isUpdatingTodo: boolean) => set({ isUpdatingTodo }),
  setDeletingTodo: (isDeletingTodo: boolean) => set({ isDeletingTodo }),
  autoDelete: () => {
    try {
      const res = axiosInstance.delete("/api/todos")
      console.log("Todos deleted successfully", res)
      toast.success("Todos deleted successfully old todos to make upto Date");
    } catch (error) {
      console.error("Error deleting todos", error)
      toast.error("Error deleting old todos to make upto Date") 
    }
  }
}))