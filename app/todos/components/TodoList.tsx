// app/todos/components/TodoList.tsx
"use client";

import { useTodoStore } from "@/lib/stores/todoStore";

export default function TodoList() {
  const { todos, deleteTodo, toggleTodo } = useTodoStore();

  return (
    <ul className="space-y-2">
      {todos.length === 0 && (
        <li className="text-gray-500">Nenhum TODO cadastrado.</li>
      )}
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleTodo(todo.id)}
            className="w-5 h-5"
          />
          <span
            className={`flex-1 ${
              todo.done ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.title}
          </span>
          <button
            className="text-red-600 px-2"
            onClick={() => deleteTodo(todo.id)}
            aria-label="Excluir TODO"
          >
            Excluir
          </button>
        </li>
      ))}
    </ul>
  );
}
