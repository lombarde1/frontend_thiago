"use client";

import { getUserId } from '@/lib/auth/storage';

const API_URL = 'https://call.evolucaohot.online/api';

export async function requestBalanceWithdraw(amount: number) {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');

  const response = await fetch(`${API_URL}/withdraw/balance/${userId}`, {
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