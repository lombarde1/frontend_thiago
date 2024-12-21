import { getUserId } from '@/lib/auth/storage';
import type { GeneratePixRequest, PixResponse, PaymentStatus } from './types';

const API_URL = 'https://call.evolucaohot.online/api';

export async function generatePix(amount: number, email: string): Promise<PixResponse> {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/payment/generate-pix/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, email })
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to generate PIX');
    }

    return data.data;
  } catch (error) {
    console.error('Error generating PIX:', error);
    throw error;
  }
}

export async function checkPaymentStatus(transactionId: string): Promise<PaymentStatus> {
  try {
    const response = await fetch(`${API_URL}/payment/check-status/${transactionId}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to check payment status');
    }

    return data.data;
  } catch (error) {
    console.error('Error checking payment status:', error);
    throw error;
  }
}