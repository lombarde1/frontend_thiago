"use client";

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { getPortfolio } from '@/lib/api/trading/service';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import type { Portfolio } from '@/lib/api/trading/types';

export function PortfolioOverview() {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      const data = await getPortfolio();
      setPortfolio(data);
    } catch (error) {
      console.error('Error loading portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalValue = portfolio.reduce((sum, item) => sum + (item.amount * item.currentPrice), 0);
  const totalProfit = portfolio.reduce((sum, item) => sum + item.profitLoss, 0);

  if (loading) {
    return (
      <Card className="bg-gray-900 p-6 animate-pulse">
        <div className="h-40 bg-gray-800 rounded-lg"></div>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Valor Total do Portfolio</h2>
        <p className="text-3xl font-bold">
          R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <p className={`text-sm ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {totalProfit >= 0 ? '+' : ''} 
          R$ {totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={portfolio}>
            <XAxis dataKey="timestamp" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                padding: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="currentPrice" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}