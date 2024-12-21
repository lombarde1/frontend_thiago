import { z } from 'zod';
import { API_ENDPOINTS } from '../api/endpoints';
import { setUserId, setToken } from './storage';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

interface AuthResponse {
  success: boolean;
  data: {
    userId: string;
    token: string;
  };
}

const API_URL = 'https://call.evolucaohot.online';

export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Falha ao fazer login');
  }

  // Store both userId and token
  setUserId(result.data.userId);
  setToken(result.data.token);

  return result;
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Falha ao criar conta');
  }

  // Store both userId and token after successful registration
  setUserId(result.data.userId);
  setToken(result.data.token);

  return result;
}