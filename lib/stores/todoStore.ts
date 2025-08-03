import { create } from "zustand";
import { Todo } from "../types";
import {
  addTodoDb,
  deleteTodoDb,
  listTodosDb,
  toggleTodoDb,
} from "../idb/todoClientDB";

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
    const newTodo: Todo = { id: Date.now().toString(), title, done: false };
    await addTodoDb(newTodo);
    const todos = await listTodosDb();
    set({ todos });
  },
  deleteTodo: async (id: string) => {
    await deleteTodoDb(id);
    const todos = await listTodosDb();
    set({ todos });
  },
  toggleTodo: async (id: string) => {
    await toggleTodoDb(id);
    const todos = await listTodosDb();
    set({ todos });
  },
}));
