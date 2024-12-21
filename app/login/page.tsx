"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, loginSchema, type LoginData } from "@/lib/auth/api";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginData>>({});
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const validatedData = loginSchema.parse(formData);
      await login(validatedData);
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: Partial<LoginData> = {};
        error.errors.forEach((err: any) => {
          if (err.path) {
            fieldErrors[err.path[0] as keyof LoginData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast.error(error.message || "Falha ao fazer login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="block text-center mb-8">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
            Coinbase
          </div>
        </Link>

        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-800">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Entre na sua conta
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              error={errors.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <FormInput
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              error={errors.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-4 text-center text-gray-400">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-blue-500 hover:text-blue-400">
              Cadastre-se
            </Link>
          </p>
        </div>

        <div className="text-center mt-6">
          <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
            Termos
          </Link>
          <span className="text-gray-400 mx-2">|</span>
          <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
            Privacidade
          </Link>
        </div>
      </div>
    </div>
  );
}