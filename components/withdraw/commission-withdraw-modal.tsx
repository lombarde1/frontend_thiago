"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDown, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";
import { requestCommissionWithdraw } from "@/lib/api/commission/service";

interface CommissionWithdrawModalProps {
  open: boolean;
  onClose: () => void;
  currentBalance: number;
}

export function CommissionWithdrawModal({ 
  open, 
  onClose, 
  currentBalance 
}: CommissionWithdrawModalProps) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleWithdraw = async () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Por favor, insira um valor válido");
      return;
    }

    if (numAmount < 50) {
      toast.error("Valor mínimo para saque: R$ 50,00");
      return;
    }

    if (numAmount > currentBalance) {
      toast.error("Saldo insuficiente");
      return;
    }

    setLoading(true);
    try {
      await requestCommissionWithdraw(numAmount);
      setSuccess(true);
    } catch (error: any) {
      toast.error(error.message || "Erro ao processar saque");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="bg-gray-900 text-white border-gray-800 sm:max-w-md">
          <div className="p-6 text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-green-500">Saque Solicitado!</h3>
              <p className="text-gray-400">
                Sua solicitação de saque foi registrada com sucesso e será processada em breve.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-5 h-5" />
                <p className="text-sm">Prazo de processamento: até 24h úteis</p>
              </div>
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={onClose}
            >
              Entendi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white border-gray-800 sm:max-w-md">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <ArrowDown className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Sacar Comissões</h3>
              <p className="text-sm text-gray-400">Saldo mínimo: R$ 50,00</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Valor do Saque</label>
            <div className="relative">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
                className="pl-8 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Saldo disponível</span>
              <span className="font-medium">
                R$ {currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white h-12"
            onClick={handleWithdraw}
            disabled={loading || !amount}
          >
            {loading ? "Processando..." : "Solicitar Saque"}
          </Button>

          <p className="text-xs text-gray-400 text-center">
            O processamento do saque pode levar até 24 horas úteis
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}