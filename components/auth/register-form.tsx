"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { register, registerSchema, type RegisterData } from "@/lib/auth";
import { validateReferralCode, processReferral } from "@/lib/api/referral/service";
import { toast } from "sonner";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [validatingReferral, setValidatingReferral] = useState(false);
  const [referralValid, setReferralValid] = useState(false);
  const [referrerId, setReferrerId] = useState<string | undefined>();
  const [errors, setErrors] = useState<Partial<RegisterData>>({});
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    cpf: "",
    password: "",
  });

  // Get referral code from URL if present
  const referralCode = searchParams?.get('ref');

  // Validate referral code when component mounts
  useEffect(() => {
    async function validateReferral() {
      if (!referralCode) return;

      setValidatingReferral(true);
      try {
        const validation = await validateReferralCode(referralCode);
        setReferralValid(validation.isValid);
        if (validation.referrerId) {
          setReferrerId(validation.referrerId);
        }
      } catch (error) {
        console.error("Error validating referral code:", error);
        toast.error("Erro ao validar código de indicação");
      } finally {
        setValidatingReferral(false);
      }
    }

    validateReferral();
  }, [referralCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const validatedData = registerSchema.parse(formData);
      const registerResponse = await register(validatedData);
      
      if (registerResponse.success && referralValid && referralCode && registerResponse.data.userId) {
        try {
          await processReferral({
            newUserId: registerResponse.data.userId,
            referralCode: referralCode
          });
          
          toast.success("Conta criada com sucesso! Bônus de indicação será aplicado após seu primeiro depósito!");
        } catch (referralError) {
          console.error("Error processing referral:", referralError);
          toast.error("Erro ao processar indicação, mas sua conta foi criada!");
        }
      } else {
        toast.success("Conta criada com sucesso!");
      }
      
      router.push("/login");
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: Partial<RegisterData> = {};
        error.errors.forEach((err: any) => {
          if (err.path) {
            fieldErrors[err.path[0] as keyof RegisterData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast.error(error.message || "Falha ao criar conta");
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
            Cadastre-se agora!
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Nome Completo"
              placeholder="Seu nome completo"
              value={formData.name}
              error={errors.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <FormInput
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              error={errors.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <FormInput
              label="CPF"
              placeholder="Apenas números"
              value={formData.cpf}
              error={errors.cpf}
              onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
            />
            <FormInput
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              error={errors.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            {referralCode && (
              <div className={`p-4 rounded-lg ${
                validatingReferral 
                  ? "bg-blue-500/10 border border-blue-500/20" 
                  : referralValid
                    ? "bg-green-500/10 border border-green-500/20"
                    : "bg-red-500/10 border border-red-500/20"
              }`}>
                <p className={`text-sm ${
                  validatingReferral 
                    ? "text-blue-400" 
                    : referralValid 
                      ? "text-green-400"
                      : "text-red-400"
                }`}>
                  {validatingReferral 
                    ? "Validando código de indicação..." 
                    : referralValid
                      ? "Código de indicação válido!"
                      : "Código de indicação inválido"}
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
              disabled={loading}
            >
              {loading ? "Criando conta..." : "Cadastrar"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-4 text-center text-gray-400">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-400">
              Faça login
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
