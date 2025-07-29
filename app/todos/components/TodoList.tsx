"use client";

import React, { useTransition } from "react";
import { toggleTodoAction } from "../actions";
import Link from "next/link";
import { cn } from "@/lib/utils/tailwindMerge";
import { Todo } from "@/lib/types";

const TodoList = ({
  todos,
  onDelete,
}: {
  todos: Todo[];
  onDelete: (id: string) => void;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <ul className="space-y-2">
      {todos.length === 0 && (
        <li className="text-gray-500">Nenhum TODO cadastrado</li>
      )}
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center gap-3">
          <span
            className={`flex-1 ${
              todo.done ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.title}
          </span>

          <button
            className="text-red-600 px-2"
            onClick={() => onDelete(todo.id)}
            aria-label="Excluir TODO"
          >
            Excluir
          </button>
        </li>
      ))}
      {isPending && <li className="text-sm text-gray-400">Atualizando...</li>}
    </ul>
  );
};

export default TodoList;
