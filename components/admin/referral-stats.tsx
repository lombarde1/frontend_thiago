"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { getReferralStats } from "@/lib/api/admin/service";
import { Users, DollarSign } from "lucide-react";
import type { ReferralStatsResponse } from "@/lib/api/admin/types";

export function ReferralStats() {
  const [stats, setStats] = useState<ReferralStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getReferralStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load referral stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <Card className="h-32 bg-gray-800" />
        <Card className="h-96 bg-gray-800" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 p-6 border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total de Indicações</p>
              <p className="text-2xl font-bold">{stats.totalReferrals}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900 p-6 border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total em Comissões</p>
              <p className="text-2xl font-bold">
                R$ {stats.totalCommissions.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Referrers */}
      <Card className="bg-gray-900 p-6 border-gray-800">
        <h2 className="text-lg font-semibold mb-6">Top Afiliados</h2>
        <div className="space-y-4">
          {stats.topReferrers.map((referrer, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">{referrer.userId.name}</p>
                  <p className="text-sm text-gray-400">{referrer.userId.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  R$ {referrer.totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-400">
                  {referrer.totalReferrals} indicações
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}