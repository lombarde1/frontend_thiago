"use client";

import { useEffect, useState } from "react";
import { getCryptoPrices } from "@/lib/api/trading/service";
import { CryptoItem } from "./crypto-list/crypto-item";

export function PortfolioList() {
  const [cryptoPrices, setCryptoPrices] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrices() {
      try {
        const prices = await getCryptoPrices();
        setCryptoPrices(prices);
      } catch (error) {
        console.error("Failed to load crypto prices:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPrices();
  }, []);

  if (loading) {
    return <div className="animate-pulse space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-20 bg-gray-800 rounded-lg" />
      ))}
    </div>;
  }

  return (
    <div className="space-y-4 pb-24">
      {Object.entries(cryptoPrices).map(([symbol, data]: [string, any]) => (
        <CryptoItem
          key={symbol}
          name={data.name}
          symbol={symbol}
          price={data.price}
          change24h={data.variation}
          chartData={[40, 35, 50, 45, 60, 55, 53]}
          color="#0052FF"
        />
      ))}
    </div>
  );
}