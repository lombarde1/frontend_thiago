export interface GeneratePixRequest {
  amount: number;
  email: string;
}

export interface PixResponse {
  qrCode: string;
  transactionId: string;
  amount: number;
}

export interface PaymentStatus {
  status: 'pending' | 'completed' | 'failed';
  amount: number;
  createdAt: string;
}

export interface PaymentError {
  message: string;
  code?: string;
}