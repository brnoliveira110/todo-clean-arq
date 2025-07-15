import {
  addTodo,
  getAllTodos,
  getTodoById,
  Todo,
  toggleTodo,
} from "../models/todo";

export function listTodos(): Todo[] {
  return getAllTodos();
}

export function getTodo(id: string): Todo | undefined {
  return getTodoById(id);
}

export function createTodo(title: string): Todo {
  if (!title || title.length < 3) throw new Error("Título muito curto");
  return addTodo(title);
}

export function toggleTodoStatus(id: string): Todo | undefined {
  return toggleTodo(id);
}
