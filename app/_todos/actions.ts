"use server";

import { createTodo, toggleTodoStatus } from "@/lib/service/todoService";

export async function createTodoAction(formData: FormData) {
  const title = formData.get("title") as string;
  if (!title) throw new Error("Título obrigatório");
  return createTodo(title);
}

export async function toggleTodoAction(id: string) {
  try {
    return toggleTodoStatus(id);
  } catch (error) {
    console.error("Erro ao alternar status do TODO:", error);
    throw error;
  }
}
