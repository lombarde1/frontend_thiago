"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Wallet, TrendingUp, ArrowDownLeft } from "lucide-react";
import { CommissionWithdrawModal } from "@/components/withdraw/commission-withdraw-modal";
import type { ReferralStats } from "@/lib/api/referral/types";

interface StatsCardProps {
  stats: ReferralStats;
}

export function StatsCard({ stats }: StatsCardProps) {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  return (
    <>
      <Card className="bg-gray-900 p-6 border-gray-800">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Carteira de Indicação</h2>
              <p className="text-sm text-gray-400">Ganhe R$ 40,00 por indicação qualificada</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-sm text-gray-400">Total Ganho</p>
              <p className="text-xl font-bold text-white">
                R$ {stats.totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-sm text-gray-400">Total Indicados</p>
              <p className="text-xl font-bold text-white">{stats.totalReferrals}</p>
            </div>
          </div>

          <div className="bg-blue-500/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <p className="text-sm font-medium text-white">Seu código de indicação</p>
            </div>
            <p className="text-lg font-mono font-bold text-white">{stats.referralCode}</p>
          </div>

          <button
            onClick={() => setShowWithdrawModal(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
          >
            <ArrowDownLeft className="w-5 h-5" />
            Sacar Comissões
          </button>

          <p className="text-xs text-center text-gray-400">
            Valor mínimo para saque: R$ 50,00
          </p>
        </div>
      </Card>

      <CommissionWithdrawModal
        open={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        currentBalance={stats.totalEarnings}
      />
    </>
  );
}