"use client";

const ADMIN_TOKEN_KEY = 'adminToken';
const ADMIN_USERNAME_KEY = 'adminUsername';

export const ADMIN_CREDENTIALS = {
  username: 'moneymoney',
  password: 'admincoin'
};

export function isAdminAuthenticated(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    const username = localStorage.getItem(ADMIN_USERNAME_KEY);
    return token === 'true' && username === ADMIN_CREDENTIALS.username;
  } catch (error) {
    console.error('Error checking admin auth:', error);
    return false;
  }
}

export function setAdminAuth(username: string): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ADMIN_TOKEN_KEY, 'true');
    localStorage.setItem(ADMIN_USERNAME_KEY, username);
  } catch (error) {
    console.error('Error setting admin auth:', error);
    throw new Error('Failed to set authentication');
  }
}

export function clearAdminAuth(): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USERNAME_KEY);
  } catch (error) {
    console.error('Error clearing admin auth:', error);
  }
}

export async function adminLogin(username: string, password: string): Promise<boolean> {
  try {
    // Validate credentials
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    // Check against hardcoded credentials
    if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
      throw new Error('Credenciais inválidas');
    }
    
    // Set authentication state
    setAdminAuth(username);
    return true;
  } catch (error) {
    console.error('Admin login error:', error);
    throw error;
  }
}

export function logoutAdmin(): void {
  clearAdminAuth();
}