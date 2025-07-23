import { v4 as uuidv4 } from "uuid";
import { Todo } from "./types";

const todos: Todo[] = [];

export function getAllTodos(): Todo[] {
  return todos;
}

export function getTodoById(id: string): Todo | undefined {
  return todos.find((todo) => todo.id === id);
}

export function addTodo(title: string): Todo {
  const newTodo: Todo = {
    id: uuidv4(),
    title,
    done: false,
  };
  todos.push(newTodo);
  return newTodo;
}

export function toggleTodo(id: string): Todo | undefined {
  const todo = getTodoById(id);
  if (todo) todo.done = !todo.done;
  return todo;
}
