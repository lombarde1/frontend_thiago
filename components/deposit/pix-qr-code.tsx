"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2, Clock, Shield } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface PixQRCodeProps {
  qrCode: string;
  amount: number;
  onPaymentConfirm: () => void;
}

export function PixQRCode({ qrCode, amount, onPaymentConfirm }: PixQRCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(qrCode);
      setCopied(true);
      toast.success("Código PIX copiado!");
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast.error("Erro ao copiar código");
    }
  };

  return (
    <Card className="bg-gradient-to-b from-gray-900 to-gray-800 p-8 relative overflow-hidden border-gray-800">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -ml-16 -mb-16 blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-white">Pague com PIX</h3>
          <p className="text-white/80">
            Valor: <span className="text-white font-semibold">R$ {amount.toFixed(2)}</span>
          </p>
        </div>

        {/* QR Code Container */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
            <div className="relative bg-white p-4 rounded-2xl">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCode)}&bgcolor=FFFFFF&color=000000&margin=1`}
                alt="QR Code PIX"
                className="w-48 h-48"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            className="w-full flex items-center justify-center gap-2 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-white/10"
            variant="outline"
            onClick={handleCopyCode}
          >
            {copied ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
            {copied ? "Código copiado!" : "Copiar código PIX"}
          </Button>

          <Button
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onPaymentConfirm}
          >
            Já realizei o pagamento
          </Button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm font-medium text-white">Expira em</p>
              <p className="text-xs text-white/60">30 minutos</p>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-sm font-medium text-white">Pagamento</p>
              <p className="text-xs text-white/60">Seguro</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-white/60 text-center">
          Após o pagamento, o saldo será creditado automaticamente em sua conta
        </p>
      </div>
    </Card>
  );
}