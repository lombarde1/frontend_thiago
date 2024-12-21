"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BarChart3, TrendingUp, Users } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export function ReferralSimulator() {
  const [invites, setInvites] = useState<number>(5);
  const bonusPerInvite = 50;
  const totalEarnings = invites * bonusPerInvite;

  const simulationData = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    earnings: totalEarnings * (i + 1)
  }));

  return (
    <Card className="bg-gray-900 p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-bold">Simulador de Ganhos</h3>
        </div>

        <div>
          <label className="text-sm text-gray-400 block mb-2">
            Quantos amigos você pretende indicar por mês?
          </label>
          <Input
            type="number"
            min="1"
            value={invites}
            onChange={(e) => setInvites(Number(e.target.value))}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <Users className="w-5 h-5 text-blue-500 mb-2" />
            <p className="text-sm text-gray-400">Indicações/mês</p>
            <p className="text-2xl font-bold">{invites}</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <TrendingUp className="w-5 h-5 text-green-500 mb-2" />
            <p className="text-sm text-gray-400">Ganhos/mês</p>
            <p className="text-2xl font-bold text-green-500">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(totalEarnings)}
            </p>
          </div>
        </div>

        <div className="h-48 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={simulationData}>
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="#6B7280"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px'
                }}
                labelStyle={{ color: '#9CA3AF' }}
                formatter={(value) => [`R$ ${value}`, 'Ganhos']}
                labelFormatter={(label) => `Mês ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-gray-400 text-center">
          *Projeção baseada em indicações mensais consistentes
        </p>
      </div>
    </Card>
  );
}