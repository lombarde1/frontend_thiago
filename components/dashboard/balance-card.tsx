"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserBalance } from "@/lib/api/wallet";

export function BalanceCard() {
  const router = useRouter();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const loadBalance = async () => {
    try {
      const data = await getUserBalance();
      setBalance(data.balance || 0);
    } catch (error) {
      console.error("Failed to load balance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBalance();
    window.addEventListener('balanceUpdate', loadBalance);
    return () => window.removeEventListener('balanceUpdate', loadBalance);
  }, []);

  return (
    <div className="mb-8">
      <div className="text-3xl font-bold mb-6">
        {loading ? (
          <div className="h-8 w-48 bg-gray-800 animate-pulse rounded" />
        ) : (
          `R$ ${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <button 
          className="w-full bg-[#0052FF] hover:bg-[#0040CC] py-3 rounded-xl text-white font-medium transition-colors"
          onClick={() => router.push('/trading')}
        >
          Comprar
        </button>
        <button 
          className="w-full bg-[#1E2025] hover:bg-[#2A2D36] py-3 rounded-xl text-white font-medium transition-colors"
          onClick={() => router.push('/deposit')}
        >
          Depositar
        </button>
      </div>
    </div>
  );
}