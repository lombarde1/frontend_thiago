"use client";

import { getUserId } from '@/lib/auth/storage';

const API_URL = 'https://call.evolucaohot.online/api';

export async function getCommissionBalance(): Promise<number> {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');

  const response = await fetch(`${API_URL}/users/${userId}/commission-balance`);
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch commission balance');
  }

  return data.data.balance;
}

export async function requestCommissionWithdraw(amount: number) {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');

  const response = await fetch(`${API_URL}/withdraw/commission/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to request withdrawal');
  }

  return data.data;
}

export async function getWithdrawRequests() {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');

  const response = await fetch(`${API_URL}/withdraw/requests/${userId}`);
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch withdraw requests');
  }

  return data.data;
}