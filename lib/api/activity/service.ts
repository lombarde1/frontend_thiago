"use client";

import { getUserId } from '@/lib/auth/storage';
import type { Activity } from './types';

const API_URL = 'https://call.evolucaohot.online/api';

export async function getActivityHistory(): Promise<Activity[]> {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/activities/activities/${userId}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch activities');
    }

    // Filter out admin activities and sort by date
    const filteredActivities = data.data
      .filter((activity: Activity) => activity.category !== 'admin_adjustment')
      .sort((a: Activity, b: Activity) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    return filteredActivities;
  } catch (error) {
    console.error('Error fetching activity history:', error);
    throw error;
  }
}

export function formatActivityAmount(activity: Activity): string {
  const amount = activity.amount.toLocaleString('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  });
  
  if (activity.category === 'deposit' || activity.category === 'referral_bonus') {
    return `+${amount}`;
  }
  return `-${amount}`;
}