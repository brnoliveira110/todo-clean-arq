"use client";

import { useEffect, useState } from "react";
import TodoList from "./todos/components/TodoList";
import { useTodoStore } from "@/lib/stores/todoStore";
import { useTodosSync } from "@/lib/hooks/useTodosSync";

export default function Home() {
  useTodosSync();

  const { getTodos, addTodo } = useTodoStore();
  const [title, setTitle] = useState("");

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTodo(title);
    setTitle("");
  };

  return (
    <>
      <main className="max-w-xl mx-auto py-10">
        <h1 className="text-2xl font=bold mb-6">TODO</h1>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Novo TODO..."
            required
            className="border px-2 py-1 flex-1 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Adicionar
          </button>
        </form>
        <TodoList />
      </main>
    </>
  );
}
