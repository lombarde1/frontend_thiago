import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import type { BalanceResponse, PortfolioResponse } from './types';

export async function getUserBalance(): Promise<BalanceResponse> {
  return apiClient.fetch<BalanceResponse>(API_ENDPOINTS.USER.BALANCE);
}

export async function getPortfolio(): Promise<PortfolioResponse> {
  return apiClient.fetch<PortfolioResponse>(API_ENDPOINTS.WALLET.PORTFOLIO);
}