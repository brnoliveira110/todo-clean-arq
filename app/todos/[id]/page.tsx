import React from "react";

import { getTodo } from "@/lib/service/todoService";
import Link from "next/link";

type Params = { params: { id: string } };

export default function TodoDetailPage({ params }: Params) {
  const todo = getTodo(params.id);

  if (!todo) {
    return (
      <div className="p-4">
        <div>TODO não encontrado</div>
        <Link
          href="/"
          className="mt-4 inline-block text-block text-blue-600 underline"
        >
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Detalhe do TODO</h2>
      <p>
        <strong>ID:</strong> {todo.id}
      </p>
      <p>
        <strong>Título:</strong> {todo.title}
      </p>
      <p>
        <strong>Status:</strong> {todo.done ? "Concluído" : "Pendente"}
      </p>
      <Link
        href="/"
        className="mt-4 inline-block text-block text-blue-600 underline"
      >
        Voltar
      </Link>
    </div>
  );
}
