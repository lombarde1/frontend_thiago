"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AmountSelectorProps {
  selectedAmount: number;
  onAmountSelect: (amount: number) => void;
}

const PRESET_AMOUNTS = [30, 40, 50, 70, 90, 100];

export function AmountSelector({ selectedAmount, onAmountSelect }: AmountSelectorProps) {
  const [customAmount, setCustomAmount] = useState("");

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      if (numValue < 30) {
        toast.error("Valor mínimo para depósito: R$ 30,00");
        return;
      }
      onAmountSelect(numValue);
    }
  };

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-[#2D5AF7] to-[#4F6EF7] rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white/90 text-sm">Saldo Atual</p>
              <p className="text-xl font-bold text-white">R$ 0,00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Amount Input */}
      <div className="space-y-2">
        <label className="text-sm text-white/80">Valor Personalizado</label>
        <div className="relative">
          <Input
            type="number"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            placeholder=""
            className="pl-8 bg-gray-800/50 border-gray-700 h-12 text-white placeholder-gray-400"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">R$</span>
        </div>
      </div>

      {/* Quick Amount Selector */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-white/60" />
          <span className="text-sm text-white/80">Valores Sugeridos</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {PRESET_AMOUNTS.map((amount) => (
            <Button
              key={amount}
              variant={selectedAmount === amount ? "default" : "outline"}
              className={`h-12 relative overflow-hidden ${
                selectedAmount === amount 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "bg-gray-800/50 hover:bg-gray-700/50 border-gray-700 text-white"
              }`}
              onClick={() => {
                onAmountSelect(amount);
                setCustomAmount("");
              }}
            >
              {selectedAmount === amount && (
                <div className="absolute inset-0 bg-white/10 animate-pulse" />
              )}
              <span className="relative z-10">R$ {amount.toFixed(2)}</span>
            </Button>
          ))}
        </div>
      </div>

      <p className="text-xs text-center text-gray-400">
        Valor mínimo para depósito: R$ 30,00
      </p>
    </div>
  );
}