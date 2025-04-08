export type Todo = {
  id: string;
  todo: string;
  real: string;
  realId?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export type todoStore = {
  todos: Todo[],
  isSettingTodo: boolean,
  isAddingTodo: boolean
  isUpdatingTodo: boolean
  isDeletingTodo: boolean

  setTodos: () => Promise<void>
  setAddingTodo: (isAddingTodo: boolean) => void
  setUpdatingTodo: (isUpdatingTodo: boolean) => void
  setDeletingTodo: (isDeletingTodo: boolean) => void
  autoDelete: () => void
}