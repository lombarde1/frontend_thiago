import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

interface ReferralStats {
  totalInvited: number;
  availableBalance: number;
  lastMonthEarnings: number;
  referralCode: string;
}

interface ReferralValidation {
  isValid: boolean;
  referrerId?: string;
}

export async function getReferralInfo(userId: string): Promise<ReferralStats> {
  try {
    const endpoint = API_ENDPOINTS.REFERRAL.INFO.replace('{userId}', userId);
    const data = await apiClient.fetch<ReferralStats>(endpoint);
    return {
      totalInvited: data.totalInvited || 0,
      availableBalance: data.availableBalance || 0,
      lastMonthEarnings: data.lastMonthEarnings || 0,
      referralCode: data.referralCode || ''
    };
  } catch (error) {
    console.error('Error fetching referral info:', error);
    return {
      totalInvited: 0,
      availableBalance: 0,
      lastMonthEarnings: 0,
      referralCode: ''
    };
  }
}

export async function generateReferralCode(userId: string): Promise<string> {
  try {
    const endpoint = API_ENDPOINTS.REFERRAL.GENERATE.replace('{userId}', userId);
    const response = await apiClient.fetch<{ code: string }>(endpoint, {
      method: 'POST'
    });
    return response.code;
  } catch (error) {
    console.error('Error generating referral code:', error);
    return '';
  }
}

export async function validateReferralCode(code: string): Promise<ReferralValidation> {
  try {
    const endpoint = API_ENDPOINTS.REFERRAL.VALIDATE.replace('{code}', code);
    const response = await apiClient.fetch<ReferralValidation>(endpoint);
    return response;
  } catch (error) {
    console.error('Error validating referral code:', error);
    return { isValid: false };
  }
}

export async function processReferral(newUserId: string, referralCode: string): Promise<boolean> {
  try {
    await apiClient.fetch(API_ENDPOINTS.REFERRAL.PROCESS, {
      method: 'POST',
      body: JSON.stringify({ newUserId, referralCode })
    });
    return true;
  } catch (error) {
    console.error('Error processing referral:', error);
    return false;
  }
}