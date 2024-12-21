import { getToken } from './auth';

const API_URL = 'https://call.evolucaohot.online/api';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro na requisição');
  }

  return response.json();
}

export async function getUserProfile() {
  return fetchWithAuth('/users/profile');
}

export async function getUserBalance() {
  return fetchWithAuth('/users/balance');
}

export async function getPortfolio() {
  return fetchWithAuth('/wallet/portfolio');
}

export async function getCryptoPrices() {
  return fetchWithAuth('/wallet/crypto-prices');
}