"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import type { PaymentStatus } from "@/lib/api/payment/types";

interface PaymentStatusProps {
  status: PaymentStatus;
  onClose: () => void;
}

export function PaymentStatusDisplay({ status, onClose }: PaymentStatusProps) {
  const getStatusDisplay = () => {
    switch (status.status) {
      case "completed":
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500" />,
          title: "Pagamento confirmado!",
          message: "O valor já foi creditado em sua conta.",
          buttonText: "Ir para carteira",
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/20"
        };
      case "failed":
        return {
          icon: <XCircle className="w-16 h-16 text-red-500" />,
          title: "Pagamento não realizado",
          message: "Houve um problema com seu pagamento. Tente novamente.",
          buttonText: "Tentar novamente",
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/20"
        };
      default:
        return {
          icon: <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />,
          title: "Verificando pagamento...",
          message: "Isso pode levar alguns instantes.",
          buttonText: "Aguarde...",
          bgColor: "bg-blue-500/10",
          borderColor: "border-blue-500/20"
        };
    }
  };

  const display = getStatusDisplay();

  return (
    <Card className="bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Icon Container */}
        <div className={`w-32 h-32 rounded-full ${display.bgColor} ${display.borderColor} border-2 flex items-center justify-center`}>
          {display.icon}
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{display.title}</h3>
          <p className="text-gray-400">{display.message}</p>
        </div>

        {/* Amount Display if completed */}
        {status.status === "completed" && (
          <div className="bg-green-500/10 rounded-xl p-4 w-full">
            <p className="text-sm text-gray-400">Valor creditado</p>
            <p className="text-2xl font-bold text-green-500">
              R$ {status.amount.toFixed(2)}
            </p>
          </div>
        )}
        
        {status.status !== "pending" && (
          <Button
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
            onClick={onClose}
          >
            {display.buttonText}
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}