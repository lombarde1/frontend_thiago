"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getDashboardStats } from "@/lib/api/admin/service";
import { Users, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { AdminDashboardStats } from "@/lib/api/admin/types";

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-32 bg-[#1A1B1E]" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#1A1B1E] p-6 border-[#2A2D36]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Total Usuários</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1A1B1E] p-6 border-[#2A2D36]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Saldo Total</p>
              <p className="text-2xl font-bold text-white">
                R$ {stats.totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1A1B1E] p-6 border-[#2A2D36]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Total Depósitos</p>
              <p className="text-2xl font-bold text-white">
                R$ {stats.totalDeposits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1A1B1E] p-6 border-[#2A2D36]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
              <ArrowDownRight className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Total Saques</p>
              <p className="text-2xl font-bold text-white">
                R$ {stats.totalWithdraws.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-[#1A1B1E] p-6 border-[#2A2D36]">
        <h2 className="text-lg font-semibold mb-4 text-white">Transações Recentes</h2>
        <div className="space-y-4">
          {stats.recentTransactions.map((transaction) => (
            <div
              key={transaction._id}
              className="flex items-center justify-between p-4 bg-[#2A2D36] rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'deposit' 
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                }`}>
                  {transaction.type === 'deposit' ? <ArrowUpRight /> : <ArrowDownRight />}
                </div>
                <div>
                  <p className="font-medium text-white">{transaction.userId.name}</p>
                  <p className="text-sm text-gray-300">{transaction.userId.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'} 
                  R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-300">{transaction.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Users */}
      <Card className="bg-[#1A1B1E] p-6 border-[#2A2D36]">
        <h2 className="text-lg font-semibold mb-4 text-white">Top Usuários</h2>
        <div className="space-y-4">
          {stats.topUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#2A2D36] rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-sm text-gray-300">{user.email}</p>
                </div>
              </div>
              <p className="font-medium text-white">
                R$ {user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}