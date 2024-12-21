import { getUserId } from '../auth/storage';
import { ApiError } from './types';

const API_URL = 'https://kcoin.evolucaohot.online/api';

class ApiClient {
  private static instance: ApiClient;
  
  private constructor() {}

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private formatEndpoint(endpoint: string, userId?: string): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return userId ? cleanEndpoint.replace('{userId}', userId) : cleanEndpoint;
  }

  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const userId = getUserId();
    
    if (!userId && !endpoint.includes('auth/')) {
      throw new Error('Usuário não autenticado');
    }

    const finalEndpoint = this.formatEndpoint(endpoint, userId);
    const url = `${API_URL}/${finalEndpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.error || 'Ocorreu um erro inesperado',
          status: response.status,
        } as ApiError;
      }

      return data.data as T;
    } catch (error) {
      if ((error as ApiError).status) {
        throw error;
      }
      throw {
        message: 'Erro de conexão. Verifique sua internet.',
        code: 'NETWORK_ERROR',
      } as ApiError;
    }
  }
}

export const apiClient = ApiClient.getInstance();