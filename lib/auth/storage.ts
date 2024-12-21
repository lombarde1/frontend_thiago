import { cookies } from 'next/headers';

const USER_ID_KEY = 'userId';
const TOKEN_KEY = 'token';

// Cookie options
const COOKIE_OPTIONS = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 30 * 24 * 60 * 60, // 30 days
  httpOnly: true
};

export function getUserId(): string | null {
  if (typeof window === 'undefined') return null;
  
  // Try to get from localStorage first
  const localStorageId = localStorage.getItem(USER_ID_KEY);
  if (localStorageId) return localStorageId;
  
  // Try to get from cookie
  const cookieId = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${USER_ID_KEY}=`))
    ?.split('=')[1];
    
  return cookieId || null;
}

export function setUserId(userId: string): void {
  if (typeof window === 'undefined') return;
  
  // Set in localStorage
  localStorage.setItem(USER_ID_KEY, userId);
  
  // Set in cookie
  document.cookie = `${USER_ID_KEY}=${userId}; path=/; max-age=${COOKIE_OPTIONS.maxAge}; ${COOKIE_OPTIONS.secure ? 'secure;' : ''} samesite=${COOKIE_OPTIONS.sameSite}`;
}

export function removeUserId(): void {
  if (typeof window === 'undefined') return;
  
  // Remove from localStorage
  localStorage.removeItem(USER_ID_KEY);
  
  // Remove from cookie
  document.cookie = `${USER_ID_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  // Try to get from localStorage first
  const localStorageToken = localStorage.getItem(TOKEN_KEY);
  if (localStorageToken) return localStorageToken;
  
  // Try to get from cookie
  const cookieToken = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${TOKEN_KEY}=`))
    ?.split('=')[1];
    
  return cookieToken || null;
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  
  // Set in localStorage
  localStorage.setItem(TOKEN_KEY, token);
  
  // Set in cookie
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${COOKIE_OPTIONS.maxAge}; ${COOKIE_OPTIONS.secure ? 'secure;' : ''} samesite=${COOKIE_OPTIONS.sameSite}`;
}

export function removeToken(): void {
  if (typeof window === 'undefined') return;
  
  // Remove from localStorage
  localStorage.removeItem(TOKEN_KEY);
  
  // Remove from cookie
  document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export function isAuthenticated(): boolean {
  const token = getToken();
  const userId = getUserId();
  return !!(token && userId);
}