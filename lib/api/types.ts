export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface BalanceResponse {
  balance: number;
  currency: string;
}

export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  value: number;
  change24h?: number;
}

export interface PortfolioResponse {
  assets: CryptoAsset[];
  totalValue: number;
}