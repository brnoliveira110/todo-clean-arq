export function notifySync() {
  localStorage.setItem("todos-async", Date.now.toString());
}
