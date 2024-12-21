export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
}

export interface TradeRequest {
  cryptoId: string;
  amount: number; // Amount in BRL
  type: 'buy' | 'sell';
}

export interface TradeResponse {
  id: string;
  userId: string;
  cryptoId: string;
  type: 'buy' | 'sell';
  amount: number;
  cryptoAmount: number;
  price: number;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Portfolio {
  id: string;
  cryptoId: string;
  amount: number;
  averagePrice: number;
  currentPrice: number;
  profitLoss: number;
  profitLossPercentage: number;
}

export interface EarningsData {
  timestamp: string;
  value: number;
}