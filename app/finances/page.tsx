"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getPortfolio } from "@/lib/api/trading/service";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { ArrowLeft, TrendingUp, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CHART_DATA = [
  { date: '2024-01', value: 4000 },
  { date: '2024-02', value: 3000 },
  { date: '2024-03', value: 5000 },
  { date: '2024-04', value: 2780 },
  { date: '2024-05', value: 1890 },
  { date: '2024-06', value: 2390 },
  { date: '2024-07', value: 3490 },
];

export default function FinancesPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPortfolio();
        setPortfolio(data);
      } catch (error) {
        console.error("Failed to load portfolio:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0D] text-white p-4">
        <div className="max-w-md mx-auto space-y-6 animate-pulse">
          <div className="h-32 bg-gray-800/50 rounded-xl"></div>
          <div className="h-64 bg-gray-800/50 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white">
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-gray-800/50"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Finanças</h1>
        </div>

        {/* Portfolio Overview */}
        <Card className="bg-gradient-to-br from-[#2D5AF7] to-[#4F6EF7] p-6 mb-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white/80 font-medium">Portfolio Total</p>
                <h2 className="text-2xl font-bold">
                  {portfolio.totalValue ? 
                    `R$ ${portfolio.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` :
                    'R$ 0,00'
                  }
                </h2>
              </div>
            </div>

            <div className="h-32 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px'
                    }}
                    labelFormatter={(value) => `Data: ${value}`}
                    formatter={(value: any) => [`R$ ${value.toFixed(2)}`, 'Valor']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#FFFFFF" 
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-[#1A1B1E] p-4 rounded-xl border-none">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-400">Ganhos 24h</span>
            </div>
            <p className="text-lg font-bold text-green-500">+2.34%</p>
          </Card>
          <Card className="bg-[#1A1B1E] p-4 rounded-xl border-none">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownRight className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-400">Perdas 24h</span>
            </div>
            <p className="text-lg font-bold text-red-500">-1.12%</p>
          </Card>
        </div>

        {/* Crypto Assets */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Seus Ativos
          </h2>

          {portfolio.coins && portfolio.coins.length > 0 ? (
            portfolio.coins.map((coin: any) => (
              <Card 
                key={coin.symbol}
                className="bg-[#1A1B1E] backdrop-blur-lg p-4 rounded-xl border-none hover:bg-[#22242A] transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2D5AF7]/10 rounded-xl flex items-center justify-center">
                      <img
                        src={`/crypto-icons/${coin.symbol.toLowerCase()}.svg`}
                        alt={coin.name}
                        className="w-6 h-6"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/crypto-icons/generic.svg";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{coin.name}</h3>
                      <p className="text-sm text-gray-400">
                        {coin.amount.toFixed(8)} {coin.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      R$ {coin.currentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className={`text-sm ${coin.variation24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {coin.variation24h >= 0 ? '+' : ''}{coin.variation24h}%
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[...Array(24)].map((_, i) => ({
                      hour: i,
                      value: Math.random() * 100
                    }))}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={coin.variation24h >= 0 ? '#22C55E' : '#EF4444'} 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            ))
          ) : (
            <Card className="bg-[#1A1B1E] p-6 text-center rounded-xl border-none">
              <p className="text-gray-400">Nenhuma criptomoeda em sua carteira</p>
              <Button 
                className="mt-4 bg-[#2D5AF7] hover:bg-[#4F6EF7] transition-colors"
                onClick={() => router.push('/trading')}
              >
                Começar a Investir
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}