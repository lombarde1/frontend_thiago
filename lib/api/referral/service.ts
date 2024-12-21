import { getUserId } from '@/lib/auth/storage';
import type { ReferralStats, GenerateCodeResponse, ProcessReferralRequest } from './types';

const API_URL = 'https://call.evolucaohot.online/api';

export async function generateReferralCode(): Promise<GenerateCodeResponse> {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/referral/generate-code/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to generate referral code');
    }

    return data.data;
  } catch (error) {
    console.error('Error generating referral code:', error);
    throw error;
  }
}

export async function validateReferralCode(code: string): Promise<{ isValid: boolean; referrerId?: string }> {
  try {
    const response = await fetch(`${API_URL}/referral/validate/${code}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to validate referral code');
    }

    return data.data;
  } catch (error) {
    console.error('Error validating referral code:', error);
    return { isValid: false };
  }
}

export async function processReferral(request: ProcessReferralRequest): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/referral/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        newUserId: request.newUserId,
        referralCode: request.referralCode
      })
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to process referral');
    }
  } catch (error) {
    console.error('Error processing referral:', error);
    throw error;
  }
}

export async function getReferralStats(): Promise<ReferralStats> {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/referral/referred-users/${userId}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch referral stats');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching referral stats:', error);
    throw error;
  }
}