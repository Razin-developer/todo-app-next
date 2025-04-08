"use client";

import { useTodoStore } from '@/store/todo';
import { Todo } from '@/types/todo';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import clsx from 'clsx';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { deleteTodo } from '@/actions/deleteTodo';
import { editTodoStatus } from '@/actions/editTodoStatus';
import { editTodo } from '@/actions/editTodo';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from 'lucide-react';

const getProgressValue = (status: string) => {
  switch (status) {
    case "active": return 66;
    case "waiting": return 33;
    case "completed": return 100;
    default: return 0;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-yellow-500 text-white";
    case "waiting": return "bg-blue-500 text-white";
    case "completed": return "bg-green-600 text-white";
    default: return "bg-gray-400 text-white";
  }
};

const TodoPage = ({ id }: { id: string }) => {
  const [filtered, setFiltered] = useState<Todo | undefined>();
  const { setTodos } = useTodoStore();
  const [isSubmitting, setIsSubmitting] = useState({ edit: false, delete: false, status: false })
  const [editData, setEditData] = useState("")
  const [statusData, setStatusData] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    setTodos().then(() => {
      const newTodos = useTodoStore.getState().todos;
      const selected = newTodos.find(todo => todo.id === id);
      setFiltered(selected);
    });
  }, [id, setTodos]);

  if (!filtered) {
    return (
      <div className='flex items-center justify-center h-screen w-full space-x-5'>
        <Loader2 className='animate-spin' size={50} color="#3b82f6" />
        <p className='text-gray-600 text-lg font-semibold'>Loading...</p>
      </div>
    );
  }

  const progress = getProgressValue(filtered.status);

  const editSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    setIsSubmitting({ ...isSubmitting, edit: true })
    e.preventDefault()
    try {
      if (!e.currentTarget.id && !e.currentTarget.real && !e.currentTarget.realId) {
        setError("Internal Server. Do after sometimes")
        return;
      }

      if (editData.trim().length < 3) {
        setError("Todo Must be lenght of 3 letters")
        return;
      }

      await editTodo(new FormData(e.currentTarget))
    } catch (error) {
      console.log("error:", error)
      setError("Internal Server Error")
      return;
    } finally {
      setIsSubmitting({ ...isSubmitting, edit: false })
    }
  }

  const statusSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    setIsSubmitting({ ...isSubmitting, status: true })
    e.preventDefault()
    try {
      if (!e.currentTarget.id && !e.currentTarget.real && !e.currentTarget.realId) {
        setError("Internal Server. Do after sometimes")
        return;
      }

      if (statusData !== "active" && statusData !== "completed" && statusData !== "waiting") {
        setError("Select a valid status")
        return;
      }

      await editTodoStatus(new FormData(e.currentTarget))
    } catch (error) {
      console.log("error:", error)
      setError("Internal Server Error")
      return;
    } finally {
      setIsSubmitting({ ...isSubmitting, status: true })
    }
  }

  const deleteSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    setIsSubmitting({ ...isSubmitting, delete: true })
    e.preventDefault()
    try {
      if (!confirm("Are you sure!")) {
        return;
      }

      if (!filtered.id && !filtered.real && !filtered.realId) {
        setError("Internel Server Error")
        return;
      }

      await deleteTodo(filtered.realId, filtered.real, filtered.id)
    } catch (error) {
      console.log("error:", error)
      setError("Internal Server Error")
      return;
    } finally {
      setIsSubmitting({ ...isSubmitting, delete: true })
    }
  }

  return (
    <div className="min-h-screen px-8 py-10 bg-muted/40 w-full">
      <div className="max-w-5xl mx-auto bg-white dark:bg-zinc-900 shadow-md rounded-2xl p-8 space-y-8 border border-border">

        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{filtered.todo}</h1>
            <p className="text-sm text-muted-foreground mt-1">Todo For: <span className="font-medium">{filtered.real}</span></p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className='bg-blue-500 hover:bg-blue-500 text-white hover:text-white px-4 py-2 h-10 rounded-lg'>Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit your Todo</DialogTitle>
                  <DialogDescription>
                    Make changes to your todo here. Click save when you&apos;re done.<br />
                    <span className="text-sm text-red-400 ml-2">* Don&apos;t left the fields empty causes error</span><br />
                    <span className="text-sm text-red-400 ml-2">* Minimum letters of 3. Below 3 causes error</span><br />
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={editSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="todo" className="text-right">
                        Todo
                      </Label>
                      <Input
                        id="todo"
                        name="todo"
                        defaultValue={filtered.todo}
                        className="col-span-3"
                        required
                        onChange={(e) => setEditData(e.target.value)}
                      />
                    </div>

                    {/* Hidden inputs */}
                    <input type="hidden" name="realId" value={filtered.realId} />
                    <input type="hidden" name="real" value={filtered.real} />
                    <input type="hidden" name="id" value={filtered.id} />
                    {error &&
                      <div className='mt-4 p-2 bg-red-100 text-red-700 rounded-lg'>
                        <strong>Error:</strong> {error}
                      </div>
                    }
                  </div>


                  <DialogFooter className='justify-between'>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button type="submit">{isSubmitting.edit ? "Saving..." : "Save changes"}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className='bg-gray-400 hover:bg-gray-400 text-white hover:text-white px-4 py-2 h-10 rounded-lg'>Update Status</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit your Todo Status</DialogTitle>
                  <DialogDescription>
                    Make changes to your todo status here. Click save when you&apos;re done.<br />
                    <span className="text-sm text-red-400 ml-2">* Don&apos;t left the fields empty causes error</span><br />
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={statusSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="todo" className="text-right">
                        Status
                      </Label>
                      <Select name='status' defaultValue={filtered.status}
                        onValueChange={(e) => setStatusData(e)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="waiting">Waiting</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Hidden inputs */}
                    <input type="hidden" name="realId" value={filtered.realId} />
                    <input type="hidden" name="real" value={filtered.real} />
                    <input type="hidden" name="id" value={filtered.id} />
                    {error &&
                      <div className='mt-4 p-2 bg-red-100 text-red-700 rounded-lg'>
                        <strong>Error:</strong> {error}
                      </div>
                    }
                  </div>

                  <DialogFooter className='justify-between'>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button type="submit">{isSubmitting.status ? "Saving..." : "Save changes"}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <form onSubmit={deleteSubmit}>
              <Button variant="secondary" size="default" className='bg-red-500 hover:bg-red-500 text-white hover:text-white px-4 py-2 h-10 rounded-lg'>Delete</Button>
              {error &&
                <div className='mt-4 p-2 bg-red-100 text-red-700 rounded-lg'>
                  <strong>Error:</strong> {error}
                </div>
              }
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              className={clsx(
                "px-3 py-1 text-xs rounded-full font-medium capitalize w-20 h-8 flex items-center justify-center",
                getStatusColor(filtered.status)
              )}
            >
              {filtered.status}
            </span>
          </div>

          <div className="text-xs text-muted-foreground text-right">
            <p>Created: {new Date(filtered.createdAt).toLocaleString()}</p>
            <p>Updated: {new Date(filtered.updatedAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-6">
          <Progress
            value={
              filtered.status === 'waiting'
                ? 33
                : filtered.status === 'active'
                  ? 66
                  : filtered.status === 'completed'
                    ? 100
                    : 0
            }
            className=""
            barColor={
              filtered.status === 'waiting'
                ? 'bg-gray-700'
                : filtered.status === 'completed'
                  ? 'bg-green-500'
                  : filtered.status === 'active'
                    ? 'bg-yellow-200'
                    : 'bg-primary'
            }
          />
          <p className="text-xs text-right mt-1 text-muted-foreground">
            Progress: {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
