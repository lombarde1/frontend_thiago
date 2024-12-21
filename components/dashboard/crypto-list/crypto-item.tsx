"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { BuyCryptoModal } from "@/components/trading/buy-crypto-modal";

interface CryptoItemProps {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  chartData: number[];
  color: string;
}

const CRYPTO_LOGOS: Record<string, string> = {
  BTC: "/crypto-icons/bitcoin.svg",
  ETH: "/crypto-icons/ethereum.svg",
  USDT: "/crypto-icons/tether.svg",
  BNB: "/crypto-icons/bnb.svg",
  SOL: "/crypto-icons/solana.svg",
  XRP: "/crypto-icons/ripple.svg",
  USDC: "/crypto-icons/usd-coin.svg",
  ADA: "/crypto-icons/cardano.svg",
  AVAX: "/crypto-icons/avalanche.svg",
  DOGE: "/crypto-icons/dogecoin.svg",
  DOT: "/crypto-icons/polkadot.svg",
  LINK: "/crypto-icons/chainlink.svg",
  MATIC: "/crypto-icons/polygon.svg",
  UNI: "/crypto-icons/uniswap.svg",
  LTC: "/crypto-icons/litecoin.svg",
  ATOM: "/crypto-icons/cosmos.svg",
  XLM: "/crypto-icons/stellar.svg",
  ALGO: "/crypto-icons/algorand.svg",
  NEAR: "/crypto-icons/near.svg",
  FTM: "/crypto-icons/fantom.svg"
};

export function CryptoItem({
  name,
  symbol,
  price,
  change24h,
  chartData,
  color
}: CryptoItemProps) {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatChartData = (data: number[]) => {
    return data.map((value, index) => ({ 
      name: index.toString(),
      value 
    }));
  };

  const getLogoUrl = (symbol: string) => {
    const normalizedSymbol = symbol.toUpperCase();
    return CRYPTO_LOGOS[normalizedSymbol] || `/crypto-icons/${symbol.toLowerCase()}.svg`;
  };

  const FallbackIcon = () => (
    <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-white">
      {symbol.slice(0, 2).toUpperCase()}
    </div>
  );

  return (
    <>
      <Card 
        className="p-4 flex items-center justify-between bg-[#1E2025] hover:bg-[#2A2D36] transition-colors cursor-pointer border-none"
        onClick={() => setShowBuyModal(true)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800">
            {!imageError ? (
              <img 
                src={getLogoUrl(symbol)}
                alt={name}
                className="w-6 h-6"
                onError={() => setImageError(true)}
              />
            ) : (
              <FallbackIcon />
            )}
          </div>
          <div>
            <h3 className="font-medium text-white">{name}</h3>
            <p className="text-sm text-gray-400">{symbol}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-medium text-white">
              R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className={`text-sm ${change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change24h > 0 ? '+' : ''}{change24h}%
            </p>
          </div>
          <div className="w-20 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formatChartData(chartData)}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color} 
                  strokeWidth={2} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <BuyCryptoModal
        open={showBuyModal}
        onClose={() => setShowBuyModal(false)}
        crypto={{ name, symbol, price }}
        onSuccess={() => {
          window.dispatchEvent(new Event('balanceUpdate'));
        }}
      />
    </>
  );
}