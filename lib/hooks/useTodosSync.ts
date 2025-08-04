import { useEffect } from "react";
import { useTodoStore } from "../stores/todoStore";

export function useTodosSync() {
  const getTodos = useTodoStore((state) => state.getTodos);

  useEffect(() => {
    getTodos();

    const handler = () => getTodos();
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [getTodos]);
}
