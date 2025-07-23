"use client";

import { Todo } from "@/lib/models/types";
import React, { useTransition } from "react";
import { toggleTodoAction } from "../actions";
import Link from "next/link";
import { cn } from "@/lib/utils/tailwindMerge";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() =>
              startTransition(async () => {
                await toggleTodoAction(todo.id);
              })
            }
            className="w-5 h-5"
          />

          <Link
            href={`/todos/${todo.id}`}
            className={cn(
              "flex-1",
              todo.done ? "line-through text-gray-500" : ""
            )}
          >
            {todo.title}
          </Link>
        </li>
      ))}
      {isPending && <li className="text-sm text-gray-400">Atualizando...</li>}
    </ul>
  );
};

export default TodoList;
