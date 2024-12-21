"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { AmountSelector } from "@/components/deposit/amount-selector";
import { PixQRCode } from "@/components/deposit/pix-qr-code";
import { PaymentStatusDisplay } from "@/components/deposit/payment-status";
import { generatePix, checkPaymentStatus } from "@/lib/api/payment/service";
import { toast } from "sonner";
import type { PaymentStatus } from "@/lib/api/payment/types";

export default function DepositPage() {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);
  const [qrCode, setQrCode] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGeneratePix = async () => {
    if (amount <= 0) {
      toast.error("Selecione um valor para depósito");
      return;
    }

    setLoading(true);
    try {
      const { qrCode, transactionId } = await generatePix(
        amount,
        "user@example.com" // TODO: Get user email from context/storage
      );
      
      setQrCode(qrCode);
      setTransactionId(transactionId);
    } catch (error) {
      toast.error("Erro ao gerar PIX. Tente novamente.");
      console.error("Error generating PIX:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentConfirm = async () => {
    if (!transactionId) return;

    const checkInterval = setInterval(async () => {
      try {
        const status = await checkPaymentStatus(transactionId);
        setPaymentStatus(status);

        if (status.status === "completed" || status.status === "failed") {
          clearInterval(checkInterval);
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        clearInterval(checkInterval);
      }
    }, 5000);

    // Initial check
    const initialStatus = await checkPaymentStatus(transactionId);
    setPaymentStatus(initialStatus);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-4">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-gray-800 text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-white">Depositar</h1>
        </div>

        {!qrCode ? (
          <Card className="bg-gray-900 p-6 border-gray-800">
            <h2 className="text-lg font-semibold mb-6 text-white">
              Adicione saldo em sua carteira
            </h2>
            
            <AmountSelector
              selectedAmount={amount}
              onAmountSelect={setAmount}
            />

            <Button
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleGeneratePix}
              disabled={loading || amount <= 0}
            >
              {loading ? "Gerando PIX..." : "Continuar"}
            </Button>
          </Card>
        ) : paymentStatus ? (
          <PaymentStatusDisplay
            status={paymentStatus}
            onClose={() => router.push("/dashboard")}
          />
        ) : (
          <PixQRCode
            qrCode={qrCode}
            amount={amount}
            onPaymentConfirm={handlePaymentConfirm}
          />
        )}
      </div>
    </div>
  );
}