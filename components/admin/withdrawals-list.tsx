"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPendingWithdrawals, processWithdrawal } from "@/lib/api/admin/service";
import { toast } from "sonner";
import { CheckCircle2, XCircle, ArrowDownLeft } from "lucide-react";

interface WithdrawalRequest {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  amount: number;
  type: 'commission' | 'balance';
  status: string;
  createdAt: string;
}

export function WithdrawalsList() {
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWithdrawals = async () => {
    try {
      const data = await getPendingWithdrawals();
      setWithdrawals(data);
    } catch (error) {
      console.error("Failed to load withdrawals:", error);
      toast.error("Erro ao carregar saques pendentes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWithdrawals();
    const interval = setInterval(loadWithdrawals, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleProcess = async (requestId: string, status: 'completed' | 'rejected') => {
    try {
      await processWithdrawal(requestId, status);
      toast.success(status === 'completed' ? "Saque aprovado!" : "Saque rejeitado!");
      loadWithdrawals();
    } catch (error) {
      toast.error("Erro ao processar saque");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="h-24 bg-gray-800 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">Saques Pendentes</h2>
      
      {withdrawals.length === 0 ? (
        <Card className="bg-gray-900 p-6 text-center border-gray-800">
          <ArrowDownLeft className="w-12 h-12 mx-auto mb-3 text-gray-600" />
          <p className="text-gray-400">Nenhum saque pendente</p>
        </Card>
      ) : (
        withdrawals.map((withdrawal) => (
          <Card key={withdrawal._id} className="bg-gray-900 p-4 border-gray-800">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-white">{withdrawal.userId.name}</h3>
                <p className="text-sm text-gray-400">{withdrawal.userId.email}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Tipo: {withdrawal.type === 'commission' ? 'Comissão' : 'Saldo'}
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-bold text-white">
                  R$ {withdrawal.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleProcess(withdrawal._id, 'completed')}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Aprovar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleProcess(withdrawal._id, 'rejected')}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Rejeitar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}