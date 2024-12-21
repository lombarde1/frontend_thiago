import type { 
  AdminDashboardStats, 
  UserListResponse, 
  ReferralStatsResponse,
  BalanceAdjustment,
  BSPayCredentials,
  UpdateBSPayCredentialsRequest
} from "./types";
import { ADMIN_CREDENTIALS } from "./auth";

const API_URL = 'https://call.evolucaohot.online/admin';

const headers = {
  'Content-Type': 'application/json',
  'username': ADMIN_CREDENTIALS.username,
  'password': ADMIN_CREDENTIALS.password
};

export async function getDashboardStats(): Promise<AdminDashboardStats> {
  try {
    const response = await fetch(`${API_URL}/dashboard`, { headers });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    throw error;
  }
}

export async function getUsers(params: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<UserListResponse> {
  try {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) queryParams.append(key, value.toString());
    });

    const response = await fetch(`${API_URL}/users?${queryParams}`, { headers });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
}

export async function adjustUserBalance(adjustment: BalanceAdjustment) {
  try {
    const response = await fetch(`${API_URL}/users/balance`, {
      method: 'POST',
      headers,
      body: JSON.stringify(adjustment)
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error('Failed to adjust balance:', error);
    throw error;
  }
}

export async function getReferralStats(): Promise<ReferralStatsResponse> {
  try {
    const response = await fetch(`${API_URL}/referrals`, { headers });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error('Failed to fetch referral stats:', error);
    throw error;
  }
}

export async function getPendingWithdrawals() {
  try {
    const response = await fetch(`${API_URL}/withdraw-requests?status=pending`, { headers });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error('Failed to fetch withdrawals:', error);
    throw error;
  }
}

export async function processWithdrawal(requestId: string, status: 'completed' | 'rejected') {
  try {
    const response = await fetch(`${API_URL}/process-withdraw/${requestId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ 
        status,
        username: ADMIN_CREDENTIALS.username
      })
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error('Failed to process withdrawal:', error);
    throw error;
  }
}

export async function getBSPayCredentials(): Promise<BSPayCredentials> {
  try {
    const response = await fetch(`${API_URL}/credentials/bspay`, { headers });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error('Failed to fetch BS Pay credentials:', error);
    throw error;
  }
}

export async function updateBSPayCredentials(credentials: UpdateBSPayCredentialsRequest): Promise<BSPayCredentials> {
  try {
    const response = await fetch(`${API_URL}/credentials/bspay`, {
      method: 'POST',
      headers,
      body: JSON.stringify(credentials)
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error('Failed to update BS Pay credentials:', error);
    throw error;
  }
}