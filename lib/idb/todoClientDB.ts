import { Todo } from "../types";
import { notifySync } from "./notify";

function getDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open("todo-mvc", 1);
    open.onupgradeneeded = () => {
      const db = open.result;
      if (!db.objectStoreNames.contains("todos")) {
        db.createObjectStore("todos", { keyPath: "id" });
      }
    };
    open.onsuccess = () => resolve(open.result);
    open.onerror = () => reject(open.error);
  });
}

export async function addTodoDb(todo: Todo) {
  const db = await getDb();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("todos", "readwrite");
    tx.objectStore("todos").add(todo);
    tx.oncomplete = () => {
      notifySync();
      resolve();
    };
    tx.onerror = () => reject(tx.error);
  });
}

export async function listTodosDb(): Promise<Todo[]> {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("todos", "readonly");
    const store = tx.objectStore("todos");
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteTodoDb(id: string) {
  const db = await getDb();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("todos", "readwrite");
    tx.objectStore("todos").delete(id);
    tx.oncomplete = () => {
      notifySync();
      resolve();
    };
    tx.onerror = () => reject(tx.error);
  });
}

export async function toggleTodoDb(id: string) {
  const db = await getDb();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("todos", "readwrite");
    const store = tx.objectStore("todos");
    const req = store.get(id);
    req.onsuccess = () => {
      const todo = req.result;
      if (!todo) {
        resolve();
        return;
      }
      todo.done = !todo.done;
      store.put(todo);
      resolve();
    };
    req.onerror = () => reject(req.error);
  });
}
