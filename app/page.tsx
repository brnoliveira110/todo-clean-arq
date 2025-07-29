"use client";

import TodoList from "./todos/components/TodoList";
import { useEffect, useState } from "react";
import { addTodoDb, deleteTodoDb, listTodosDb } from "@/lib/idb/todoClientDB";
import { Todo } from "@/lib/types";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [titile, setTitle] = useState("");

  async function refreshTodos() {
    const list = await listTodosDb();
    setTodos(list);
  }

  useEffect(() => {
    refreshTodos();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!titile.trim()) return;
    await addTodoDb({ id: Date.now().toString(), title: titile, done: false });
    setTitle("");
    await refreshTodos();
  }
  async function handleDelete(id: string) {
    await deleteTodoDb(id);
    await refreshTodos();
  }

  return (
    <>
      <main className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font=bold mb-6">TODO</h1>
        <form onSubmit={handleAdd} className="flex gap-2 mb-6 p-4">
          <input
            name="title"
            placeholder="nova tarefa"
            required
            className="border px-2 py-1 flex-1 rounded"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-1 rounded p-4"
          >
            Add
          </button>
        </form>
        <TodoList todos={todos} onDelete={handleDelete} />
      </main>
    </>
  );
}
