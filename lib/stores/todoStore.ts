import { create } from "zustand";
import { Todo } from "../types";
import {
  addTodoDb,
  deleteTodoDb,
  listTodosDb,
  toggleTodoDb,
} from "../idb/todoClientDb";
import { notifySync } from "../idb/notify";

type TodoStore = {
  todos: Todo[];
  getTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  getTodos: async () => {
    const todos = await listTodosDb();
    set({ todos });
  },
  addTodo: async (title: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      done: false,
    };
    await addTodoDb(newTodo);
    set((state) => ({ todos: [...state.todos, newTodo] }));
    notifySync();
  },
  deleteTodo: async (id: string) => {
    await deleteTodoDb(id);

    set((state) => ({ todos: state.todos.filter((t) => t.id !== id) }));
    notifySync();
  },
  toggleTodo: async (id: string) => {
    await toggleTodoDb(id);
    const todos = await listTodosDb();
    todos.find((t) => t.id === id);
    set({ todos });
    notifySync();
  },
}));
