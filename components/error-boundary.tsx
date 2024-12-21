"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold">Oops! Algo deu errado</h1>
        <p className="text-gray-400">
          Desculpe, ocorreu um erro ao carregar esta página.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push("/dashboard")}>
            Voltar ao início
          </Button>
          <Button variant="outline" onClick={reset}>
            Tentar novamente
          </Button>
        </div>
      </div>
    </div>
  );
}