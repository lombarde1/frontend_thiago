import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

interface UserProfile {
  name: string;
  email: string;
  cpf?: string;
}

export async function getUserProfile(): Promise<UserProfile> {
  const userId = localStorage.getItem('userId');
  return apiClient.fetch<UserProfile>(`/users/profile/${userId}`);
}