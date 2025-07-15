import { createTodoAction } from "./_todos/actions";

export default function Home() {
  return (
    <>
      <main className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font=bold mb-6">TODO</h1>
        <form
          action={async (formData) => {
            "use server";
            await createTodoAction(formData);
          }}
          className="flex gap-2 mb-6 p-4"
        >
          <input
            name="title"
            placeholder="nova tarefa"
            required
            className="border px-2 py-1 flex-1 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-1 rounded p-4"
          >
            Add
          </button>
        </form>
      </main>
    </>
  );
}
