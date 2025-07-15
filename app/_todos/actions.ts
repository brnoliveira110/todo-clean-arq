"use server";

import { createTodo, toggleTodoStatus } from "@/lib/service/todoService";

export async function createTodoAction(formData: FormData) {
  const title = formData.get("title") as string;
  if (!title) throw new Error("Título obrigatório");
  return createTodo(title);
}

export async function toggleTodoAction(id: string) {
  return toggleTodoStatus(id);
}
