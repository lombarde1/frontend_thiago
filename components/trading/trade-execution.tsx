"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getUserBalance } from '@/lib/api/wallet';

interface TradeExecutionProps {
  cryptoId: string;
  currentPrice: number;
  symbol: string;
  onSuccess?: () => void;
}

export function TradeExecution({ cryptoId, currentPrice, symbol, onSuccess }: TradeExecutionProps) {
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleTrade = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Por favor, insira um valor válido");
      return;
    }

    try {
      setLoading(true);
      
      // Check user balance
      const { balance } = await getUserBalance();
      if (Number(amount) > balance) {
        toast.error("Saldo insuficiente");
        return;
      }

      // Simulate successful trade
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Compra realizada com sucesso!");
      onSuccess?.();
      setAmount('');
    } catch (error) {
      console.error('Trade execution error:', error);
      toast.error("Erro ao processar a compra");
    } finally {
      setLoading(false);
    }
  };

  const cryptoAmount = Number(amount) / currentPrice;

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-gray-400 block mb-2">
          Valor em Reais (R$)
        </label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="bg-gray-800 border-gray-700"
        />
        {amount && (
          <p className="mt-2 text-sm text-gray-400">
            Você receberá: {cryptoAmount.toFixed(8)} {symbol}
          </p>
        )}
      </div>

      <Button
        onClick={handleTrade}
        disabled={loading || !amount || Number(amount) <= 0}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {loading ? "Processando..." : "Confirmar Compra"}
      </Button>
    </div>
  );
}