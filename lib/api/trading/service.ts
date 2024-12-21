import { getUserId } from '@/lib/auth/storage';

const API_URL = 'https://call.evolucaohot.online';

export async function buyCrypto(symbol: string, amount: number) {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');

  const response = await fetch(`${API_URL}/wallet/buy-crypto/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symbol, amount })
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to buy crypto');
  }

  return data.data;
}

export async function sellCrypto(symbol: string, cryptoAmount: number) {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');

  const response = await fetch(`${API_URL}/wallet/sell-crypto/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symbol, cryptoAmount })
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to sell crypto');
  }

  return data.data;
}

export async function getCryptoPrices() {
  const response = await fetch(`${API_URL}/wallet/crypto-prices`);
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch crypto prices');
  }

  return data.data;
}

export async function getPortfolio() {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');

  const response = await fetch(`${API_URL}/wallet/portfolio/${userId}`);
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch portfolio');
  }

  return data.data;
}